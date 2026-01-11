/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { oktaApiRequest, oktaApiRequestAllItems } from '../../transport/client';

export async function get(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const appId = this.getNodeParameter('appId', i) as string;
	const responseData = (await oktaApiRequest.call(this, 'GET', `/apps/${encodeURIComponent(appId)}`)) as IDataObject;
	return [{ json: responseData }];
}

export async function getAll(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const filters = this.getNodeParameter('filters', i) as IDataObject;
	const query: IDataObject = {};

	if (filters.filter) {query.filter = filters.filter;}
	if (filters.q) {query.q = filters.q;}
	if (filters.status) {query.filter = `status eq "${filters.status}"`;}

	let responseData: IDataObject[];
	if (returnAll) {
		responseData = await oktaApiRequestAllItems.call(this, 'GET', '/apps', undefined, query);
	} else {
		const limit = this.getNodeParameter('limit', i) as number;
		responseData = await oktaApiRequestAllItems.call(this, 'GET', '/apps', undefined, query, limit);
	}

	return responseData.map((item) => ({ json: item }));
}

export async function deleteApp(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const appId = this.getNodeParameter('appId', i) as string;
	await oktaApiRequest.call(this, 'DELETE', `/apps/${encodeURIComponent(appId)}`);
	return [{ json: { success: true, appId } }];
}

export async function activate(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const appId = this.getNodeParameter('appId', i) as string;
	await oktaApiRequest.call(this, 'POST', `/apps/${encodeURIComponent(appId)}/lifecycle/activate`);
	return [{ json: { success: true, appId } }];
}

export async function deactivate(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const appId = this.getNodeParameter('appId', i) as string;
	await oktaApiRequest.call(this, 'POST', `/apps/${encodeURIComponent(appId)}/lifecycle/deactivate`);
	return [{ json: { success: true, appId } }];
}

export async function getUsers(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const appId = this.getNodeParameter('appId', i) as string;
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;

	let responseData: IDataObject[];
	if (returnAll) {
		responseData = await oktaApiRequestAllItems.call(this, 'GET', `/apps/${encodeURIComponent(appId)}/users`);
	} else {
		const limit = this.getNodeParameter('limit', i) as number;
		responseData = await oktaApiRequestAllItems.call(
			this,
			'GET',
			`/apps/${encodeURIComponent(appId)}/users`,
			undefined,
			undefined,
			limit,
		);
	}

	return responseData.map((item) => ({ json: item }));
}

export async function assignUser(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const appId = this.getNodeParameter('appId', i) as string;
	const userId = this.getNodeParameter('userId', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const body: IDataObject = {
		id: userId,
	};

	if (additionalFields.userName) {
		body.credentials = { userName: additionalFields.userName };
	}

	if (additionalFields.password) {
		body.credentials = {
			...(body.credentials as IDataObject || {}),
			password: { value: additionalFields.password },
		};
	}

	if (additionalFields.profile) {
		try {
			body.profile = JSON.parse(additionalFields.profile as string);
		} catch {
			body.profile = {};
		}
	}

	const responseData = (await oktaApiRequest.call(this, 'POST', `/apps/${encodeURIComponent(appId)}/users`, body)) as IDataObject;
	return [{ json: responseData }];
}

export async function removeUser(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const appId = this.getNodeParameter('appId', i) as string;
	const userId = this.getNodeParameter('userId', i) as string;

	await oktaApiRequest.call(
		this,
		'DELETE',
		`/apps/${encodeURIComponent(appId)}/users/${encodeURIComponent(userId)}`,
	);
	return [{ json: { success: true, appId, userId } }];
}

export async function getGroups(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const appId = this.getNodeParameter('appId', i) as string;
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', `/apps/${encodeURIComponent(appId)}/groups`);
	return responseData.map((item) => ({ json: item }));
}

export async function assignGroup(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const appId = this.getNodeParameter('appId', i) as string;
	const groupId = this.getNodeParameter('groupId', i) as string;

	const responseData = (await oktaApiRequest.call(
		this,
		'PUT',
		`/apps/${encodeURIComponent(appId)}/groups/${encodeURIComponent(groupId)}`,
	)) as IDataObject;
	return [{ json: responseData || { success: true, appId, groupId } }];
}

export async function removeGroup(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const appId = this.getNodeParameter('appId', i) as string;
	const groupId = this.getNodeParameter('groupId', i) as string;

	await oktaApiRequest.call(
		this,
		'DELETE',
		`/apps/${encodeURIComponent(appId)}/groups/${encodeURIComponent(groupId)}`,
	);
	return [{ json: { success: true, appId, groupId } }];
}
