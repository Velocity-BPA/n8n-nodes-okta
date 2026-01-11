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
	const description = this.getNodeParameter('description', i) as string;
	const body: IDataObject = { profile: { name, description } };
	const responseData = await oktaApiRequest.call(this, 'POST', '/groups', body) as IDataObject;
	return [{ json: responseData }];
}

export async function get(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const groupId = this.getNodeParameter('groupId', i) as string;
	const responseData = await oktaApiRequest.call(this, 'GET', `/groups/${encodeURIComponent(groupId)}`) as IDataObject;
	return [{ json: responseData }];
}

export async function getAll(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const filters = this.getNodeParameter('filters', i) as IDataObject;
	const query: IDataObject = {};
	if (filters.filter) {query.filter = filters.filter;}
	if (filters.q) {query.q = filters.q;}
	if (filters.type) {query.filter = `type eq "${filters.type}"`;}
	const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', '/groups', undefined, query, limit);
	return responseData.map((item) => ({ json: item }));
}

export async function update(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const groupId = this.getNodeParameter('groupId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const profile: IDataObject = {};
	if (updateFields.name) {profile.name = updateFields.name;}
	if (updateFields.description !== undefined) {profile.description = updateFields.description;}
	const responseData = await oktaApiRequest.call(this, 'PUT', `/groups/${encodeURIComponent(groupId)}`, { profile }) as IDataObject;
	return [{ json: responseData }];
}

export async function deleteGroup(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const groupId = this.getNodeParameter('groupId', i) as string;
	await oktaApiRequest.call(this, 'DELETE', `/groups/${encodeURIComponent(groupId)}`);
	return [{ json: { success: true, groupId } }];
}

export async function getMembers(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const groupId = this.getNodeParameter('groupId', i) as string;
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', `/groups/${encodeURIComponent(groupId)}/users`, undefined, undefined, limit);
	return responseData.map((item) => ({ json: item }));
}

export async function addMember(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const groupId = this.getNodeParameter('groupId', i) as string;
	const userId = this.getNodeParameter('userId', i) as string;
	await oktaApiRequest.call(this, 'PUT', `/groups/${encodeURIComponent(groupId)}/users/${encodeURIComponent(userId)}`);
	return [{ json: { success: true, groupId, userId } }];
}

export async function removeMember(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const groupId = this.getNodeParameter('groupId', i) as string;
	const userId = this.getNodeParameter('userId', i) as string;
	await oktaApiRequest.call(this, 'DELETE', `/groups/${encodeURIComponent(groupId)}/users/${encodeURIComponent(userId)}`);
	return [{ json: { success: true, groupId, userId } }];
}

export async function getApps(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const groupId = this.getNodeParameter('groupId', i) as string;
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', `/groups/${encodeURIComponent(groupId)}/apps`);
	return responseData.map((item) => ({ json: item }));
}
