/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const factorOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['factor'],
			},
		},
		options: [
			{
				name: 'Activate',
				value: 'activate',
				description: 'Activate a pending factor',
				action: 'Activate a factor',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a factor enrollment',
				action: 'Delete a factor',
			},
			{
				name: 'Enroll',
				value: 'enroll',
				description: 'Enroll a new factor for a user',
				action: 'Enroll a factor',
			},
			{
				name: 'Get Security Questions',
				value: 'getSecurityQuestions',
				description: 'Get available security questions',
				action: 'Get security questions',
			},
			{
				name: 'Get Supported',
				value: 'getSupported',
				description: 'Get supported factor types',
				action: 'Get supported factor types',
			},
			{
				name: 'Get User Factors',
				value: 'getUserFactors',
				description: 'Get enrolled factors for a user',
				action: 'Get user factors',
			},
			{
				name: 'Reset',
				value: 'reset',
				description: 'Reset all factors for a user',
				action: 'Reset all factors',
			},
			{
				name: 'Verify',
				value: 'verify',
				description: 'Verify a factor challenge',
				action: 'Verify a factor',
			},
		],
		default: 'getUserFactors',
	},
];

export const factorFields: INodeProperties[] = [
	// ----------------------------------
	//         factor: Common userId field
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['factor'],
				operation: ['getSupported', 'getUserFactors', 'enroll', 'reset', 'getSecurityQuestions'],
			},
		},
		description: 'The ID or login of the user',
	},

	// ----------------------------------
	//         factor:enroll
	// ----------------------------------
	{
		displayName: 'Factor Type',
		name: 'factorType',
		type: 'options',
		required: true,
		options: [
			{ name: 'Call', value: 'call' },
			{ name: 'Email', value: 'email' },
			{ name: 'Push (Okta Verify)', value: 'push' },
			{ name: 'Security Question', value: 'question' },
			{ name: 'SMS', value: 'sms' },
			{ name: 'TOTP (Google/Okta Authenticator)', value: 'token:software:totp' },
			{ name: 'WebAuthn', value: 'webauthn' },
		],
		default: 'sms',
		displayOptions: {
			show: {
				resource: ['factor'],
				operation: ['enroll'],
			},
		},
		description: 'Type of factor to enroll',
	},
	{
		displayName: 'Provider',
		name: 'provider',
		type: 'options',
		options: [
			{ name: 'Okta', value: 'OKTA' },
			{ name: 'Google', value: 'GOOGLE' },
			{ name: 'Duo', value: 'DUO' },
			{ name: 'RSA', value: 'RSA' },
			{ name: 'Symantec', value: 'SYMANTEC' },
			{ name: 'YubiKey', value: 'YUBICO' },
		],
		default: 'OKTA',
		displayOptions: {
			show: {
				resource: ['factor'],
				operation: ['enroll'],
			},
		},
		description: 'Factor provider',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['factor'],
				operation: ['enroll'],
			},
		},
		options: [
			{
				displayName: 'Answer',
				name: 'answer',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Answer for security question factor',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Email address for email factor',
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				placeholder: '+1-555-555-5555',
				description: 'Phone number for SMS or call factor (E.164 format)',
			},
			{
				displayName: 'Question',
				name: 'question',
				type: 'string',
				default: '',
				description: 'Security question key (use Get Security Questions to find valid keys)',
			},
		],
	},

	// ----------------------------------
	//         factor:activate/verify/delete
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userIdForFactor',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['factor'],
				operation: ['activate', 'verify', 'delete'],
			},
		},
		description: 'The ID or login of the user',
	},
	{
		displayName: 'Factor ID',
		name: 'factorId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['factor'],
				operation: ['activate', 'verify', 'delete'],
			},
		},
		description: 'The ID of the factor',
	},

	// ----------------------------------
	//         factor:activate
	// ----------------------------------
	{
		displayName: 'Pass Code',
		name: 'passCode',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['factor'],
				operation: ['activate'],
			},
		},
		description: 'OTP code to activate the factor (required for TOTP, SMS, etc.)',
	},

	// ----------------------------------
	//         factor:verify
	// ----------------------------------
	{
		displayName: 'Verification Options',
		name: 'verificationOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['factor'],
				operation: ['verify'],
			},
		},
		options: [
			{
				displayName: 'Answer',
				name: 'answer',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Answer for security question verification',
			},
			{
				displayName: 'Pass Code',
				name: 'passCode',
				type: 'string',
				default: '',
				description: 'OTP code for verification',
			},
		],
	},
];
