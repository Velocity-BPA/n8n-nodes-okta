/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const policyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['policy'],
			},
		},
		options: [
			{
				name: 'Activate',
				value: 'activate',
				description: 'Activate a policy',
				action: 'Activate a policy',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new policy',
				action: 'Create a policy',
			},
			{
				name: 'Create Rule',
				value: 'createRule',
				description: 'Create a rule for a policy',
				action: 'Create a policy rule',
			},
			{
				name: 'Deactivate',
				value: 'deactivate',
				description: 'Deactivate a policy',
				action: 'Deactivate a policy',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a policy',
				action: 'Delete a policy',
			},
			{
				name: 'Delete Rule',
				value: 'deleteRule',
				description: 'Delete a policy rule',
				action: 'Delete a policy rule',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a policy by ID',
				action: 'Get a policy',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many policies',
				action: 'Get many policies',
			},
			{
				name: 'Get Rules',
				value: 'getRules',
				description: 'Get rules for a policy',
				action: 'Get policy rules',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a policy',
				action: 'Update a policy',
			},
		],
		default: 'get',
	},
];

export const policyFields: INodeProperties[] = [
	// ----------------------------------
	//         policy:create
	// ----------------------------------
	{
		displayName: 'Policy Type',
		name: 'type',
		type: 'options',
		required: true,
		options: [
			{ name: 'Access Policy', value: 'ACCESS_POLICY' },
			{ name: 'IdP Discovery', value: 'IDP_DISCOVERY' },
			{ name: 'MFA Enrollment', value: 'MFA_ENROLL' },
			{ name: 'Okta Sign-On', value: 'OKTA_SIGN_ON' },
			{ name: 'Password', value: 'PASSWORD' },
			{ name: 'Profile Enrollment', value: 'PROFILE_ENROLLMENT' },
		],
		default: 'OKTA_SIGN_ON',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['create', 'getAll'],
			},
		},
		description: 'The type of policy',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['create'],
			},
		},
		description: 'Name of the policy',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['create'],
			},
		},
		description: 'Description of the policy',
	},
	{
		displayName: 'Priority',
		name: 'priority',
		type: 'number',
		default: 1,
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['create'],
			},
		},
		description: 'Policy priority (lower number = higher priority)',
	},

	// ----------------------------------
	//         policy:get, update, delete, activate, deactivate, getRules
	// ----------------------------------
	{
		displayName: 'Policy ID',
		name: 'policyId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['get', 'update', 'delete', 'activate', 'deactivate', 'getRules', 'createRule'],
			},
		},
		description: 'The ID of the policy',
	},

	// ----------------------------------
	//         policy:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['getAll', 'getRules'],
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
				resource: ['policy'],
				operation: ['getAll', 'getRules'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         policy:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['update'],
			},
		},
		options: [
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
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'number',
				default: 1,
			},
		],
	},

	// ----------------------------------
	//         policy:createRule
	// ----------------------------------
	{
		displayName: 'Rule Name',
		name: 'ruleName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['createRule'],
			},
		},
		description: 'Name of the rule',
	},
	{
		displayName: 'Rule Priority',
		name: 'rulePriority',
		type: 'number',
		default: 1,
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['createRule'],
			},
		},
		description: 'Rule priority (lower number = higher priority)',
	},
	{
		displayName: 'Conditions (JSON)',
		name: 'conditions',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['createRule'],
			},
		},
		description: 'Rule conditions as JSON object',
	},
	{
		displayName: 'Actions (JSON)',
		name: 'actions',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['createRule'],
			},
		},
		description: 'Rule actions as JSON object',
	},

	// ----------------------------------
	//         policy:deleteRule
	// ----------------------------------
	{
		displayName: 'Policy ID',
		name: 'policyIdForRule',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['deleteRule'],
			},
		},
		description: 'The ID of the policy',
	},
	{
		displayName: 'Rule ID',
		name: 'ruleId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['policy'],
				operation: ['deleteRule'],
			},
		},
		description: 'The ID of the rule to delete',
	},
];
