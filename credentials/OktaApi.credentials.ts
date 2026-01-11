/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class OktaApi implements ICredentialType {
	name = 'oktaApi';
	displayName = 'Okta API';
	documentationUrl = 'https://developer.okta.com/docs/reference/api/';
	properties: INodeProperties[] = [
		{
			displayName: 'Organization URL',
			name: 'orgUrl',
			type: 'string',
			default: '',
			placeholder: 'https://your-org.okta.com',
			description: 'Your Okta organization URL (e.g., https://dev-123456.okta.com)',
			required: true,
		},
		{
			displayName: 'Authentication Method',
			name: 'authMethod',
			type: 'options',
			options: [
				{
					name: 'API Token',
					value: 'apiToken',
					description: 'Use an SSWS API token for authentication',
				},
				{
					name: 'OAuth 2.0',
					value: 'oauth2',
					description: 'Use OAuth 2.0 with private key JWT for authentication',
				},
			],
			default: 'apiToken',
			description: 'The authentication method to use',
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'SSWS API token from Admin Console > Security > API > Tokens',
			displayOptions: {
				show: {
					authMethod: ['apiToken'],
				},
			},
			required: true,
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			description: 'OAuth 2.0 client ID from your Okta application',
			displayOptions: {
				show: {
					authMethod: ['oauth2'],
				},
			},
		},
		{
			displayName: 'Private Key (PEM)',
			name: 'privateKey',
			type: 'string',
			typeOptions: {
				password: true,
				rows: 10,
			},
			default: '',
			description: 'Private key in PEM format for OAuth 2.0 JWT authentication',
			displayOptions: {
				show: {
					authMethod: ['oauth2'],
				},
			},
		},
		{
			displayName: 'Scopes',
			name: 'scopes',
			type: 'string',
			default: 'okta.users.read okta.users.manage',
			description: 'Space-separated list of OAuth 2.0 scopes',
			displayOptions: {
				show: {
					authMethod: ['oauth2'],
				},
			},
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{$credentials.authMethod === "apiToken" ? "SSWS " + $credentials.apiToken : "Bearer " + $credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.orgUrl}}',
			url: '/api/v1/users/me',
			method: 'GET',
		},
	};
}
