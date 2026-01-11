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
	const audiences = this.getNodeParameter('audiences', i) as string;
	const description = this.getNodeParameter('description', i) as string;
	const body: IDataObject = { name, audiences: audiences.split(',').map((a) => a.trim()), description };
	const responseData = await oktaApiRequest.call(this, 'POST', '/authorizationServers', body) as IDataObject;
	return [{ json: responseData }];
}

export async function get(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const authServerId = this.getNodeParameter('authServerId', i) as string;
	const responseData = await oktaApiRequest.call(this, 'GET', `/authorizationServers/${encodeURIComponent(authServerId)}`) as IDataObject;
	return [{ json: responseData }];
}

export async function getAll(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', '/authorizationServers', undefined, undefined, limit);
	return responseData.map((item) => ({ json: item }));
}

export async function update(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const authServerId = this.getNodeParameter('authServerId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const currentServer = await oktaApiRequest.call(this, 'GET', `/authorizationServers/${encodeURIComponent(authServerId)}`) as IDataObject;
	const body: IDataObject = { ...currentServer };
	if (updateFields.name) {body.name = updateFields.name;}
	if (updateFields.description !== undefined) {body.description = updateFields.description;}
	if (updateFields.audiences) {body.audiences = (updateFields.audiences as string).split(',').map((a) => a.trim());}
	const responseData = await oktaApiRequest.call(this, 'PUT', `/authorizationServers/${encodeURIComponent(authServerId)}`, body) as IDataObject;
	return [{ json: responseData }];
}

export async function deleteServer(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const authServerId = this.getNodeParameter('authServerId', i) as string;
	await oktaApiRequest.call(this, 'DELETE', `/authorizationServers/${encodeURIComponent(authServerId)}`);
	return [{ json: { success: true, authServerId } }];
}

export async function activate(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const authServerId = this.getNodeParameter('authServerId', i) as string;
	await oktaApiRequest.call(this, 'POST', `/authorizationServers/${encodeURIComponent(authServerId)}/lifecycle/activate`);
	return [{ json: { success: true, authServerId } }];
}

export async function deactivate(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const authServerId = this.getNodeParameter('authServerId', i) as string;
	await oktaApiRequest.call(this, 'POST', `/authorizationServers/${encodeURIComponent(authServerId)}/lifecycle/deactivate`);
	return [{ json: { success: true, authServerId } }];
}

export async function getScopes(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const authServerId = this.getNodeParameter('authServerId', i) as string;
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', `/authorizationServers/${encodeURIComponent(authServerId)}/scopes`);
	return responseData.map((item) => ({ json: item }));
}

export async function createScope(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const authServerId = this.getNodeParameter('authServerId', i) as string;
	const scopeName = this.getNodeParameter('scopeName', i) as string;
	const scopeDescription = this.getNodeParameter('scopeDescription', i) as string;
	const consent = this.getNodeParameter('consent', i) as string;
	const body: IDataObject = { name: scopeName, description: scopeDescription, consent };
	const responseData = await oktaApiRequest.call(this, 'POST', `/authorizationServers/${encodeURIComponent(authServerId)}/scopes`, body) as IDataObject;
	return [{ json: responseData }];
}

export async function getClaims(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const authServerId = this.getNodeParameter('authServerId', i) as string;
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', `/authorizationServers/${encodeURIComponent(authServerId)}/claims`);
	return responseData.map((item) => ({ json: item }));
}

export async function createClaim(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const authServerId = this.getNodeParameter('authServerId', i) as string;
	const claimName = this.getNodeParameter('claimName', i) as string;
	const claimType = this.getNodeParameter('claimType', i) as string;
	const valueType = this.getNodeParameter('valueType', i) as string;
	const claimValue = this.getNodeParameter('claimValue', i) as string;
	const body: IDataObject = { name: claimName, claimType, valueType, value: claimValue, status: 'ACTIVE' };
	const responseData = await oktaApiRequest.call(this, 'POST', `/authorizationServers/${encodeURIComponent(authServerId)}/claims`, body) as IDataObject;
	return [{ json: responseData }];
}
