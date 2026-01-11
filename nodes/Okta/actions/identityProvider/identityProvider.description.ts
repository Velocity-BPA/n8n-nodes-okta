/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const identityProviderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['identityProvider'],
			},
		},
		options: [
			{
				name: 'Activate',
				value: 'activate',
				description: 'Activate an identity provider',
				action: 'Activate an identity provider',
			},
			{
				name: 'Deactivate',
				value: 'deactivate',
				description: 'Deactivate an identity provider',
				action: 'Deactivate an identity provider',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an identity provider',
				action: 'Delete an identity provider',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an identity provider by ID',
				action: 'Get an identity provider',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many identity providers',
				action: 'Get many identity providers',
			},
			{
				name: 'Get Linked Users',
				value: 'getLinkedUsers',
				description: 'Get users linked to an identity provider',
				action: 'Get linked users',
			},
			{
				name: 'Link User',
				value: 'linkUser',
				description: 'Link a user to an identity provider',
				action: 'Link user to id p',
			},
			{
				name: 'Unlink User',
				value: 'unlinkUser',
				description: 'Unlink a user from an identity provider',
				action: 'Unlink user from id p',
			},
		],
		default: 'get',
	},
];

export const identityProviderFields: INodeProperties[] = [
	// ----------------------------------
	//         identityProvider:get, delete, activate, deactivate, getLinkedUsers
	// ----------------------------------
	{
		displayName: 'Identity Provider ID',
		name: 'idpId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['identityProvider'],
				operation: ['get', 'delete', 'activate', 'deactivate', 'getLinkedUsers', 'linkUser', 'unlinkUser'],
			},
		},
		description: 'The ID of the identity provider',
	},

	// ----------------------------------
	//         identityProvider:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['identityProvider'],
				operation: ['getAll', 'getLinkedUsers'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		displayOptions: {
			show: {
				resource: ['identityProvider'],
				operation: ['getAll', 'getLinkedUsers'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['identityProvider'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Query',
				name: 'q',
				type: 'string',
				default: '',
				description: 'Search by IdP name',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Apple', value: 'APPLE' },
					{ name: 'Facebook', value: 'FACEBOOK' },
					{ name: 'Google', value: 'GOOGLE' },
					{ name: 'LinkedIn', value: 'LINKEDIN' },
					{ name: 'Microsoft', value: 'MICROSOFT' },
					{ name: 'OIDC', value: 'OIDC' },
					{ name: 'SAML 2.0', value: 'SAML2' },
				],
				default: '',
				description: 'Filter by IdP type',
			},
		],
	},

	// ----------------------------------
	//         identityProvider:linkUser, unlinkUser
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['identityProvider'],
				operation: ['linkUser', 'unlinkUser'],
			},
		},
		description: 'The ID of the user',
	},
	{
		displayName: 'External ID',
		name: 'externalId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['identityProvider'],
				operation: ['linkUser'],
			},
		},
		description: 'The external ID from the identity provider',
	},
];
