/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { oktaApiRequest, oktaApiRequestAllItems } from '../../transport/client';

export async function create(
	this: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const firstName = this.getNodeParameter('firstName', i) as string;
	const lastName = this.getNodeParameter('lastName', i) as string;
	const email = this.getNodeParameter('email', i) as string;
	const login = this.getNodeParameter('login', i) as string;
	const activate = this.getNodeParameter('activate', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const profile: IDataObject = { firstName, lastName, email, login };
	const profileFields = [
		'mobilePhone', 'secondEmail', 'displayName', 'nickName', 'profileUrl',
		'title', 'employeeNumber', 'costCenter', 'organization', 'division',
		'department', 'managerId', 'manager', 'streetAddress', 'city', 'state',
		'zipCode', 'countryCode', 'preferredLanguage', 'locale', 'timezone', 'userType',
	];
	for (const field of profileFields) {
		if (additionalFields[field]) {profile[field] = additionalFields[field];}
	}

	const body: IDataObject = { profile };
	if (additionalFields.password) {
		body.credentials = { password: { value: additionalFields.password } };
	}
	if (additionalFields.recoveryQuestion && additionalFields.recoveryAnswer) {
		body.credentials = {
			...(body.credentials as IDataObject || {}),
			recovery_question: { question: additionalFields.recoveryQuestion, answer: additionalFields.recoveryAnswer },
		};
	}
	if (additionalFields.groupIds) {
		body.groupIds = (additionalFields.groupIds as string).split(',').map((id) => id.trim());
	}

	const query: IDataObject = {};
	if (activate === 'true') {query.activate = 'true';}
	else if (activate === 'sendEmail') { query.activate = 'true'; query.sendEmail = 'true'; }

	const responseData = await oktaApiRequest.call(this, 'POST', '/users', body, query) as IDataObject;
	return [{ json: responseData }];
}

export async function get(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	const responseData = await oktaApiRequest.call(this, 'GET', `/users/${encodeURIComponent(userId)}`) as IDataObject;
	return [{ json: responseData }];
}

export async function getAll(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const filters = this.getNodeParameter('filters', i) as IDataObject;
	const query: IDataObject = {};
	if (filters.filter) {query.filter = filters.filter;}
	if (filters.search) {query.search = filters.search;}
	if (filters.q) {query.q = filters.q;}
	if (filters.status) {query.filter = `status eq "${filters.status}"`;}

	const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', '/users', undefined, query, limit);
	return responseData.map((item) => ({ json: item }));
}

export async function update(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const profile: IDataObject = {};
	for (const [key, value] of Object.entries(updateFields)) {
		if (value !== '' && value !== undefined) {profile[key] = value;}
	}
	const responseData = await oktaApiRequest.call(this, 'POST', `/users/${encodeURIComponent(userId)}`, { profile }) as IDataObject;
	return [{ json: responseData }];
}

export async function deleteUser(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	await oktaApiRequest.call(this, 'DELETE', `/users/${encodeURIComponent(userId)}`);
	return [{ json: { success: true, userId } }];
}

export async function activate(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	const sendEmail = this.getNodeParameter('sendEmail', i) as boolean;
	const responseData = await oktaApiRequest.call(this, 'POST', `/users/${encodeURIComponent(userId)}/lifecycle/activate`, undefined, { sendEmail: sendEmail.toString() }) as IDataObject;
	return [{ json: responseData || { success: true, userId } }];
}

export async function deactivate(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	await oktaApiRequest.call(this, 'POST', `/users/${encodeURIComponent(userId)}/lifecycle/deactivate`);
	return [{ json: { success: true, userId } }];
}

export async function suspend(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	await oktaApiRequest.call(this, 'POST', `/users/${encodeURIComponent(userId)}/lifecycle/suspend`);
	return [{ json: { success: true, userId } }];
}

export async function unsuspend(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	await oktaApiRequest.call(this, 'POST', `/users/${encodeURIComponent(userId)}/lifecycle/unsuspend`);
	return [{ json: { success: true, userId } }];
}

export async function unlock(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	await oktaApiRequest.call(this, 'POST', `/users/${encodeURIComponent(userId)}/lifecycle/unlock`);
	return [{ json: { success: true, userId } }];
}

export async function resetPassword(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	const responseData = await oktaApiRequest.call(this, 'POST', `/users/${encodeURIComponent(userId)}/lifecycle/reset_password`, undefined, { sendEmail: 'true' }) as IDataObject;
	return [{ json: responseData }];
}

export async function setPassword(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	const password = this.getNodeParameter('password', i) as string;
	const responseData = await oktaApiRequest.call(this, 'PUT', `/users/${encodeURIComponent(userId)}`, { credentials: { password: { value: password } } }) as IDataObject;
	return [{ json: responseData }];
}

export async function expirePassword(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	const responseData = await oktaApiRequest.call(this, 'POST', `/users/${encodeURIComponent(userId)}/lifecycle/expire_password`) as IDataObject;
	return [{ json: responseData }];
}

export async function clearSessions(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	await oktaApiRequest.call(this, 'DELETE', `/users/${encodeURIComponent(userId)}/sessions`);
	return [{ json: { success: true, userId } }];
}

export async function getGroups(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', `/users/${encodeURIComponent(userId)}/groups`);
	return responseData.map((item) => ({ json: item }));
}

export async function getApps(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', `/users/${encodeURIComponent(userId)}/appLinks`);
	return responseData.map((item) => ({ json: item }));
}

export async function getFactors(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', `/users/${encodeURIComponent(userId)}/factors`);
	return responseData.map((item) => ({ json: item }));
}

export async function resetFactors(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	await oktaApiRequest.call(this, 'POST', `/users/${encodeURIComponent(userId)}/lifecycle/reset_factors`);
	return [{ json: { success: true, userId } }];
}
