/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { oktaApiRequest, oktaApiRequestAllItems } from '../../transport/client';

export async function create(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const name = this.getNodeParameter('name', i) as string;
	const uri = this.getNodeParameter('uri', i) as string;
	const events = this.getNodeParameter('events', i) as string[];
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const body: IDataObject = {
		name,
		events: {
			type: 'EVENT_TYPE',
			items: events,
		},
		channel: {
			type: 'HTTP',
			version: '1.0.0',
			config: {
				uri,
				authScheme: {
					type: 'HEADER',
					key: additionalFields.authHeaderName || 'Authorization',
					value: additionalFields.authHeaderValue || '',
				},
			},
		},
	};

	const responseData = await oktaApiRequest.call(this, 'POST', '/eventHooks', body) as IDataObject;
	return [{ json: responseData }];
}

export async function get(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const eventHookId = this.getNodeParameter('eventHookId', i) as string;
	const responseData = await oktaApiRequest.call(this, 'GET', `/eventHooks/${encodeURIComponent(eventHookId)}`) as IDataObject;
	return [{ json: responseData }];
}

export async function getAll(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', '/eventHooks', undefined, undefined, limit);
	return responseData.map((item) => ({ json: item }));
}

export async function update(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const eventHookId = this.getNodeParameter('eventHookId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

	// Fetch current hook to preserve existing settings
	const currentHook = await oktaApiRequest.call(this, 'GET', `/eventHooks/${encodeURIComponent(eventHookId)}`) as IDataObject;
	const body: IDataObject = { ...currentHook };

	if (updateFields.name) {
		body.name = updateFields.name;
	}

	if (updateFields.events && (updateFields.events as string[]).length > 0) {
		body.events = {
			type: 'EVENT_TYPE',
			items: updateFields.events,
		};
	}

	if (updateFields.uri || updateFields.authHeaderName || updateFields.authHeaderValue) {
		const currentChannel = (currentHook.channel as IDataObject) || {};
		const currentConfig = (currentChannel.config as IDataObject) || {};
		const currentAuthScheme = (currentConfig.authScheme as IDataObject) || {};

		body.channel = {
			type: 'HTTP',
			version: '1.0.0',
			config: {
				uri: updateFields.uri || currentConfig.uri,
				authScheme: {
					type: 'HEADER',
					key: updateFields.authHeaderName || currentAuthScheme.key || 'Authorization',
					value: updateFields.authHeaderValue || currentAuthScheme.value || '',
				},
			},
		};
	}

	const responseData = await oktaApiRequest.call(this, 'PUT', `/eventHooks/${encodeURIComponent(eventHookId)}`, body) as IDataObject;
	return [{ json: responseData }];
}

export async function deleteHook(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const eventHookId = this.getNodeParameter('eventHookId', i) as string;
	await oktaApiRequest.call(this, 'DELETE', `/eventHooks/${encodeURIComponent(eventHookId)}`);
	return [{ json: { success: true, eventHookId } }];
}

export async function activate(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const eventHookId = this.getNodeParameter('eventHookId', i) as string;
	const responseData = await oktaApiRequest.call(this, 'POST', `/eventHooks/${encodeURIComponent(eventHookId)}/lifecycle/activate`) as IDataObject;
	return [{ json: responseData }];
}

export async function deactivate(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const eventHookId = this.getNodeParameter('eventHookId', i) as string;
	const responseData = await oktaApiRequest.call(this, 'POST', `/eventHooks/${encodeURIComponent(eventHookId)}/lifecycle/deactivate`) as IDataObject;
	return [{ json: responseData }];
}

export async function verify(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const eventHookId = this.getNodeParameter('eventHookId', i) as string;
	const responseData = await oktaApiRequest.call(this, 'POST', `/eventHooks/${encodeURIComponent(eventHookId)}/lifecycle/verify`) as IDataObject;
	return [{ json: responseData }];
}
