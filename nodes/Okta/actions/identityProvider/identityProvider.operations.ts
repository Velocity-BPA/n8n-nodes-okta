/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { oktaApiRequest, oktaApiRequestAllItems } from '../../transport/client';

export async function get(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const idpId = this.getNodeParameter('idpId', i) as string;
	const responseData = await oktaApiRequest.call(this, 'GET', `/idps/${encodeURIComponent(idpId)}`) as IDataObject;
	return [{ json: responseData }];
}

export async function getAll(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const filters = this.getNodeParameter('filters', i) as IDataObject;
	const query: IDataObject = {};
	if (filters.q) {query.q = filters.q;}
	if (filters.type) {query.type = filters.type;}
	const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', '/idps', undefined, query, limit);
	return responseData.map((item) => ({ json: item }));
}

export async function deleteIdp(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const idpId = this.getNodeParameter('idpId', i) as string;
	await oktaApiRequest.call(this, 'DELETE', `/idps/${encodeURIComponent(idpId)}`);
	return [{ json: { success: true, idpId } }];
}

export async function activate(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const idpId = this.getNodeParameter('idpId', i) as string;
	await oktaApiRequest.call(this, 'POST', `/idps/${encodeURIComponent(idpId)}/lifecycle/activate`);
	return [{ json: { success: true, idpId } }];
}

export async function deactivate(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const idpId = this.getNodeParameter('idpId', i) as string;
	await oktaApiRequest.call(this, 'POST', `/idps/${encodeURIComponent(idpId)}/lifecycle/deactivate`);
	return [{ json: { success: true, idpId } }];
}

export async function getLinkedUsers(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const idpId = this.getNodeParameter('idpId', i) as string;
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', `/idps/${encodeURIComponent(idpId)}/users`);
	return responseData.map((item) => ({ json: item }));
}

export async function linkUser(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const idpId = this.getNodeParameter('idpId', i) as string;
	const userId = this.getNodeParameter('userId', i) as string;
	const externalId = this.getNodeParameter('externalId', i) as string;
	const responseData = await oktaApiRequest.call(this, 'POST', `/idps/${encodeURIComponent(idpId)}/users/${encodeURIComponent(userId)}`, { externalId }) as IDataObject;
	return [{ json: responseData }];
}

export async function unlinkUser(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const idpId = this.getNodeParameter('idpId', i) as string;
	const userId = this.getNodeParameter('userId', i) as string;
	await oktaApiRequest.call(this, 'DELETE', `/idps/${encodeURIComponent(idpId)}/users/${encodeURIComponent(userId)}`);
	return [{ json: { success: true, idpId, userId } }];
}
