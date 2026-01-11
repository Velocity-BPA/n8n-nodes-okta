/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const authServerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['authServer'],
			},
		},
		options: [
			{
				name: 'Activate',
				value: 'activate',
				description: 'Activate an authorization server',
				action: 'Activate an authorization server',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new authorization server',
				action: 'Create an authorization server',
			},
			{
				name: 'Create Claim',
				value: 'createClaim',
				description: 'Create a custom claim',
				action: 'Create a claim',
			},
			{
				name: 'Create Scope',
				value: 'createScope',
				description: 'Create a scope',
				action: 'Create a scope',
			},
			{
				name: 'Deactivate',
				value: 'deactivate',
				description: 'Deactivate an authorization server',
				action: 'Deactivate an authorization server',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an authorization server',
				action: 'Delete an authorization server',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an authorization server by ID',
				action: 'Get an authorization server',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many authorization servers',
				action: 'Get many authorization servers',
			},
			{
				name: 'Get Claims',
				value: 'getClaims',
				description: 'Get claims for an authorization server',
				action: 'Get claims',
			},
			{
				name: 'Get Scopes',
				value: 'getScopes',
				description: 'Get scopes for an authorization server',
				action: 'Get scopes',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an authorization server',
				action: 'Update an authorization server',
			},
		],
		default: 'get',
	},
];

export const authServerFields: INodeProperties[] = [
	// ----------------------------------
	//         authServer:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['authServer'],
				operation: ['create'],
			},
		},
		description: 'Name of the authorization server',
	},
	{
		displayName: 'Audiences',
		name: 'audiences',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['authServer'],
				operation: ['create'],
			},
		},
		description: 'Comma-separated list of token audiences',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['authServer'],
				operation: ['create'],
			},
		},
		description: 'Description of the authorization server',
	},

	// ----------------------------------
	//         authServer:get, update, delete, etc.
	// ----------------------------------
	{
		displayName: 'Authorization Server ID',
		name: 'authServerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['authServer'],
				operation: ['get', 'update', 'delete', 'activate', 'deactivate', 'getScopes', 'createScope', 'getClaims', 'createClaim'],
			},
		},
		description: 'The ID of the authorization server',
	},

	// ----------------------------------
	//         authServer:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['authServer'],
				operation: ['getAll', 'getScopes', 'getClaims'],
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
				resource: ['authServer'],
				operation: ['getAll', 'getScopes', 'getClaims'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         authServer:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['authServer'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Audiences',
				name: 'audiences',
				type: 'string',
				default: '',
				description: 'Comma-separated list of token audiences',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         authServer:createScope
	// ----------------------------------
	{
		displayName: 'Scope Name',
		name: 'scopeName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['authServer'],
				operation: ['createScope'],
			},
		},
		description: 'Name of the scope',
	},
	{
		displayName: 'Scope Description',
		name: 'scopeDescription',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['authServer'],
				operation: ['createScope'],
			},
		},
		description: 'Description of the scope',
	},
	{
		displayName: 'Consent',
		name: 'consent',
		type: 'options',
		options: [
			{ name: 'Implicit', value: 'IMPLICIT' },
			{ name: 'Required', value: 'REQUIRED' },
		],
		default: 'IMPLICIT',
		displayOptions: {
			show: {
				resource: ['authServer'],
				operation: ['createScope'],
			},
		},
		description: 'Whether user consent is required',
	},

	// ----------------------------------
	//         authServer:createClaim
	// ----------------------------------
	{
		displayName: 'Claim Name',
		name: 'claimName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['authServer'],
				operation: ['createClaim'],
			},
		},
		description: 'Name of the claim',
	},
	{
		displayName: 'Claim Type',
		name: 'claimType',
		type: 'options',
		options: [
			{ name: 'Identity', value: 'IDENTITY' },
			{ name: 'Resource', value: 'RESOURCE' },
		],
		default: 'RESOURCE',
		displayOptions: {
			show: {
				resource: ['authServer'],
				operation: ['createClaim'],
			},
		},
		description: 'Type of the claim',
	},
	{
		displayName: 'Value Type',
		name: 'valueType',
		type: 'options',
		options: [
			{ name: 'Expression', value: 'EXPRESSION' },
			{ name: 'Groups', value: 'GROUPS' },
		],
		default: 'EXPRESSION',
		displayOptions: {
			show: {
				resource: ['authServer'],
				operation: ['createClaim'],
			},
		},
		description: 'Type of value',
	},
	{
		displayName: 'Value',
		name: 'claimValue',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['authServer'],
				operation: ['createClaim'],
			},
		},
		description: 'Value expression or group filter',
	},
];
