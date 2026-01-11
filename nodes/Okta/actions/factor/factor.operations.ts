/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { oktaApiRequest, oktaApiRequestAllItems } from '../../transport/client';

export async function getSupported(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', `/users/${encodeURIComponent(userId)}/factors/catalog`);
	return responseData.map((item) => ({ json: item }));
}

export async function getUserFactors(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', `/users/${encodeURIComponent(userId)}/factors`);
	return responseData.map((item) => ({ json: item }));
}

export async function enroll(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	const factorType = this.getNodeParameter('factorType', i) as string;
	const provider = this.getNodeParameter('provider', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

	const body: IDataObject = {
		factorType,
		provider,
	};

	// Build profile based on factor type
	const profile: IDataObject = {};

	if (additionalFields.phoneNumber) {
		profile.phoneNumber = additionalFields.phoneNumber;
	}

	if (additionalFields.email) {
		profile.email = additionalFields.email;
	}

	if (additionalFields.question) {
		profile.question = additionalFields.question;
	}

	if (additionalFields.answer) {
		profile.answer = additionalFields.answer;
	}

	if (Object.keys(profile).length > 0) {
		body.profile = profile;
	}

	const responseData = await oktaApiRequest.call(this, 'POST', `/users/${encodeURIComponent(userId)}/factors`, body) as IDataObject;
	return [{ json: responseData }];
}

export async function activate(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userIdForFactor', i) as string;
	const factorId = this.getNodeParameter('factorId', i) as string;
	const passCode = this.getNodeParameter('passCode', i) as string;

	const body: IDataObject = {};
	if (passCode) {
		body.passCode = passCode;
	}

	const responseData = await oktaApiRequest.call(
		this,
		'POST',
		`/users/${encodeURIComponent(userId)}/factors/${encodeURIComponent(factorId)}/lifecycle/activate`,
		Object.keys(body).length > 0 ? body : undefined
	) as IDataObject;
	return [{ json: responseData }];
}

export async function verify(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userIdForFactor', i) as string;
	const factorId = this.getNodeParameter('factorId', i) as string;
	const verificationOptions = this.getNodeParameter('verificationOptions', i) as IDataObject;

	const body: IDataObject = {};
	if (verificationOptions.passCode) {
		body.passCode = verificationOptions.passCode;
	}
	if (verificationOptions.answer) {
		body.answer = verificationOptions.answer;
	}

	const responseData = await oktaApiRequest.call(
		this,
		'POST',
		`/users/${encodeURIComponent(userId)}/factors/${encodeURIComponent(factorId)}/verify`,
		Object.keys(body).length > 0 ? body : undefined
	) as IDataObject;
	return [{ json: responseData }];
}

export async function deleteFactor(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userIdForFactor', i) as string;
	const factorId = this.getNodeParameter('factorId', i) as string;
	await oktaApiRequest.call(this, 'DELETE', `/users/${encodeURIComponent(userId)}/factors/${encodeURIComponent(factorId)}`);
	return [{ json: { success: true, userId, factorId } }];
}

export async function reset(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	await oktaApiRequest.call(this, 'POST', `/users/${encodeURIComponent(userId)}/lifecycle/reset_factors`);
	return [{ json: { success: true, userId, message: 'All factors reset' } }];
}

export async function getSecurityQuestions(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const userId = this.getNodeParameter('userId', i) as string;
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', `/users/${encodeURIComponent(userId)}/factors/questions`);
	return responseData.map((item) => ({ json: item }));
}
