/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	IPollFunctions,
	IWebhookFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import { ERROR_CODES } from '../constants/constants';

type OktaContext =
	| IExecuteFunctions
	| ILoadOptionsFunctions
	| IPollFunctions
	| IWebhookFunctions;

/**
 * Parse Link header to get pagination URL
 */
function parseLinkHeader(linkHeader: string | undefined, rel: string): string | null {
	if (!linkHeader) {return null;}
	const links = linkHeader.split(',');
	for (const link of links) {
		const match = link.match(/<([^>]+)>;\s*rel="([^"]+)"/);
		if (match && match[2] === rel) {
			return match[1];
		}
	}
	return null;
}

/**
 * Main API request function
 */
export async function oktaApiRequest(
	this: OktaContext,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: IDataObject,
	query?: IDataObject,
): Promise<IDataObject | IDataObject[]> {
	const credentials = await this.getCredentials('oktaApi');
	const orgUrl = credentials.orgUrl as string;

	// Remove trailing slash from orgUrl if present
	const baseUrl = orgUrl.replace(/\/$/, '');

	const options: IHttpRequestOptions = {
		method,
		url: `${baseUrl}/api/v1${endpoint}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		json: true,
	};

	// Set authentication header based on method
	if (credentials.authMethod === 'apiToken') {
		options.headers!['Authorization'] = `SSWS ${credentials.apiToken}`;
	} else {
		// OAuth 2.0 - would need to implement token acquisition
		options.headers!['Authorization'] = `Bearer ${credentials.accessToken || ''}`;
	}

	if (body && Object.keys(body).length > 0) {
		options.body = body;
	}

	if (query && Object.keys(query).length > 0) {
		options.qs = query;
	}

	try {
		const response = await this.helpers.httpRequest(options);
		return response as IDataObject | IDataObject[];
	} catch (error: unknown) {
		const jsonError = error as JsonObject;
		const errorBody = (jsonError.response as JsonObject)?.body as JsonObject;

		if (errorBody?.errorCode) {
			const errorCode = errorBody.errorCode as string;
			const errorMessage = ERROR_CODES[errorCode] || (errorBody.errorSummary as string);
			const errorCauses = errorBody.errorCauses as Array<{ errorSummary: string }> || [];

			throw new NodeApiError(this.getNode(), jsonError, {
				message: errorMessage,
				description: errorCauses.map((c) => c.errorSummary).join(', ') || undefined,
			});
		}

		throw new NodeApiError(this.getNode(), jsonError);
	}
}

/**
 * Request function that returns full response (including headers for pagination)
 */
export async function oktaApiRequestWithResponse(
	this: OktaContext,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: IDataObject,
	query?: IDataObject,
): Promise<{ body: IDataObject | IDataObject[]; headers: Record<string, string> }> {
	const credentials = await this.getCredentials('oktaApi');
	const orgUrl = credentials.orgUrl as string;
	const baseUrl = orgUrl.replace(/\/$/, '');

	const options: IHttpRequestOptions = {
		method,
		url: `${baseUrl}/api/v1${endpoint}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		json: true,
		returnFullResponse: true,
	};

	if (credentials.authMethod === 'apiToken') {
		options.headers!['Authorization'] = `SSWS ${credentials.apiToken}`;
	} else {
		options.headers!['Authorization'] = `Bearer ${credentials.accessToken || ''}`;
	}

	if (body && Object.keys(body).length > 0) {
		options.body = body;
	}

	if (query && Object.keys(query).length > 0) {
		options.qs = query;
	}

	try {
		const response = (await this.helpers.httpRequest(options)) as {
			body: IDataObject | IDataObject[];
			headers: Record<string, string>;
		};
		return response;
	} catch (error: unknown) {
		const jsonError = error as JsonObject;
		const errorBody = (jsonError.response as JsonObject)?.body as JsonObject;

		if (errorBody?.errorCode) {
			const errorCode = errorBody.errorCode as string;
			const errorMessage = ERROR_CODES[errorCode] || (errorBody.errorSummary as string);

			throw new NodeApiError(this.getNode(), jsonError, {
				message: errorMessage,
			});
		}

		throw new NodeApiError(this.getNode(), jsonError);
	}
}

/**
 * Request all items with automatic pagination using Link headers
 */
export async function oktaApiRequestAllItems(
	this: OktaContext,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: IDataObject,
	query?: IDataObject,
	limit?: number,
): Promise<IDataObject[]> {
	const credentials = await this.getCredentials('oktaApi');
	const orgUrl = credentials.orgUrl as string;
	const baseUrl = orgUrl.replace(/\/$/, '');

	const results: IDataObject[] = [];
	let nextUrl: string | null = `${baseUrl}/api/v1${endpoint}`;

	const requestQuery = { ...query };
	if (!requestQuery.limit) {
		requestQuery.limit = 200;
	}

	do {
		const options: IHttpRequestOptions = {
			method,
			url: nextUrl,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			json: true,
			returnFullResponse: true,
		};

		if (credentials.authMethod === 'apiToken') {
			options.headers!['Authorization'] = `SSWS ${credentials.apiToken}`;
		} else {
			options.headers!['Authorization'] = `Bearer ${credentials.accessToken || ''}`;
		}

		if (body && Object.keys(body).length > 0) {
			options.body = body;
		}

		// Only add query params on first request (subsequent use URL from Link header)
		if (nextUrl === `${baseUrl}/api/v1${endpoint}` && requestQuery && Object.keys(requestQuery).length > 0) {
			options.qs = requestQuery;
		}

		try {
			const response = (await this.helpers.httpRequest(options)) as {
				body: IDataObject | IDataObject[];
				headers: Record<string, string>;
			};

			const items = Array.isArray(response.body) ? response.body : [response.body];
			results.push(...items);

			// Check if we've reached the requested limit
			if (limit && results.length >= limit) {
				return results.slice(0, limit);
			}

			// Get next page URL from Link header
			nextUrl = parseLinkHeader(response.headers.link, 'next');
		} catch (error: unknown) {
			const jsonError = error as JsonObject;
			throw new NodeApiError(this.getNode(), jsonError);
		}
	} while (nextUrl);

	return limit ? results.slice(0, limit) : results;
}

/**
 * Make a request to a specific URL (used for pagination with Link header URLs)
 */
export async function oktaApiRequestUrl(
	this: OktaContext,
	method: IHttpRequestMethods,
	url: string,
	body?: IDataObject,
): Promise<{ body: IDataObject | IDataObject[]; headers: Record<string, string> }> {
	const credentials = await this.getCredentials('oktaApi');

	const options: IHttpRequestOptions = {
		method,
		url,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		json: true,
		returnFullResponse: true,
	};

	if (credentials.authMethod === 'apiToken') {
		options.headers!['Authorization'] = `SSWS ${credentials.apiToken}`;
	} else {
		options.headers!['Authorization'] = `Bearer ${credentials.accessToken || ''}`;
	}

	if (body && Object.keys(body).length > 0) {
		options.body = body;
	}

	try {
		const response = (await this.helpers.httpRequest(options)) as {
			body: IDataObject | IDataObject[];
			headers: Record<string, string>;
		};
		return response;
	} catch (error: unknown) {
		const jsonError = error as JsonObject;
		throw new NodeApiError(this.getNode(), jsonError);
	}
}

/**
 * Handle rate limiting with exponential backoff
 */
export async function handleRateLimit<T>(
	fn: () => Promise<T>,
	maxRetries = 3,
	initialDelay = 1000,
): Promise<T> {
	let retries = 0;
	let delay = initialDelay;

	while (retries < maxRetries) {
		try {
			return await fn();
		} catch (error: unknown) {
			const jsonError = error as JsonObject;
			const statusCode = (jsonError.response as JsonObject)?.statusCode;

			if (statusCode === 429 && retries < maxRetries - 1) {
				// Get reset time from header if available
				const resetHeader = (jsonError.response as JsonObject)?.headers as Record<string, string>;
				const resetTime = resetHeader?.['x-rate-limit-reset'];

				if (resetTime) {
					const resetTimestamp = parseInt(resetTime, 10) * 1000;
					delay = Math.max(resetTimestamp - Date.now(), delay);
				}

				await new Promise((resolve) => setTimeout(resolve, delay));
				delay *= 2; // Exponential backoff
				retries++;
			} else {
				throw error;
			}
		}
	}

	throw new Error('Max retries exceeded for rate-limited request');
}
