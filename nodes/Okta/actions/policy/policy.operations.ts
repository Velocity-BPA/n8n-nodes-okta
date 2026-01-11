/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { oktaApiRequest, oktaApiRequestAllItems } from '../../transport/client';

export async function create(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const type = this.getNodeParameter('type', i) as string;
	const name = this.getNodeParameter('name', i) as string;
	const description = this.getNodeParameter('description', i) as string;
	const priority = this.getNodeParameter('priority', i) as number;
	const body: IDataObject = { type, name, description, priority, status: 'ACTIVE' };
	const responseData = await oktaApiRequest.call(this, 'POST', '/policies', body) as IDataObject;
	return [{ json: responseData }];
}

export async function get(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const policyId = this.getNodeParameter('policyId', i) as string;
	const responseData = await oktaApiRequest.call(this, 'GET', `/policies/${encodeURIComponent(policyId)}`) as IDataObject;
	return [{ json: responseData }];
}

export async function getAll(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const type = this.getNodeParameter('policyType', i) as string;
	const query: IDataObject = { type };
	const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', '/policies', undefined, query, limit);
	return responseData.map((item) => ({ json: item }));
}

export async function update(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const policyId = this.getNodeParameter('policyId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const currentPolicy = await oktaApiRequest.call(this, 'GET', `/policies/${encodeURIComponent(policyId)}`) as IDataObject;
	const body: IDataObject = { ...currentPolicy };
	if (updateFields.name) {body.name = updateFields.name;}
	if (updateFields.description !== undefined) {body.description = updateFields.description;}
	if (updateFields.priority !== undefined) {body.priority = updateFields.priority;}
	const responseData = await oktaApiRequest.call(this, 'PUT', `/policies/${encodeURIComponent(policyId)}`, body) as IDataObject;
	return [{ json: responseData }];
}

export async function deletePolicy(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const policyId = this.getNodeParameter('policyId', i) as string;
	await oktaApiRequest.call(this, 'DELETE', `/policies/${encodeURIComponent(policyId)}`);
	return [{ json: { success: true, policyId } }];
}

export async function activate(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const policyId = this.getNodeParameter('policyId', i) as string;
	await oktaApiRequest.call(this, 'POST', `/policies/${encodeURIComponent(policyId)}/lifecycle/activate`);
	return [{ json: { success: true, policyId } }];
}

export async function deactivate(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const policyId = this.getNodeParameter('policyId', i) as string;
	await oktaApiRequest.call(this, 'POST', `/policies/${encodeURIComponent(policyId)}/lifecycle/deactivate`);
	return [{ json: { success: true, policyId } }];
}

export async function getRules(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const policyId = this.getNodeParameter('policyId', i) as string;
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', `/policies/${encodeURIComponent(policyId)}/rules`);
	return responseData.map((item) => ({ json: item }));
}

export async function createRule(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const policyId = this.getNodeParameter('policyIdForRule', i) as string;
	const ruleName = this.getNodeParameter('ruleName', i) as string;
	const rulePriority = this.getNodeParameter('rulePriority', i) as number;
	const conditions = this.getNodeParameter('conditions', i) as string;
	const actions = this.getNodeParameter('actions', i) as string;
	const body: IDataObject = { name: ruleName, priority: rulePriority, status: 'ACTIVE' };
	if (conditions) { try { body.conditions = JSON.parse(conditions); } catch { body.conditions = {}; } }
	if (actions) { try { body.actions = JSON.parse(actions); } catch { body.actions = {}; } }
	const responseData = await oktaApiRequest.call(this, 'POST', `/policies/${encodeURIComponent(policyId)}/rules`, body) as IDataObject;
	return [{ json: responseData }];
}

export async function deleteRule(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const policyId = this.getNodeParameter('policyIdForRule', i) as string;
	const ruleId = this.getNodeParameter('ruleId', i) as string;
	await oktaApiRequest.call(this, 'DELETE', `/policies/${encodeURIComponent(policyId)}/rules/${encodeURIComponent(ruleId)}`);
	return [{ json: { success: true, policyId, ruleId } }];
}
