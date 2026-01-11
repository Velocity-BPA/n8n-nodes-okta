/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Activate',
				value: 'activate',
				description: 'Activate a user',
				action: 'Activate a user',
			},
			{
				name: 'Clear Sessions',
				value: 'clearSessions',
				description: 'Clear all sessions for a user',
				action: 'Clear sessions for a user',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new user',
				action: 'Create a user',
			},
			{
				name: 'Deactivate',
				value: 'deactivate',
				description: 'Deactivate a user',
				action: 'Deactivate a user',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently delete a user',
				action: 'Delete a user',
			},
			{
				name: 'Expire Password',
				value: 'expirePassword',
				description: 'Expire a user\'s password',
				action: 'Expire password for a user',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a user by ID or login',
				action: 'Get a user',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many users',
				action: 'Get many users',
			},
			{
				name: 'Get Apps',
				value: 'getApps',
				description: 'Get applications assigned to a user',
				action: 'Get apps for a user',
			},
			{
				name: 'Get Factors',
				value: 'getFactors',
				description: 'Get MFA factors enrolled by a user',
				action: 'Get factors for a user',
			},
			{
				name: 'Get Groups',
				value: 'getGroups',
				description: 'Get groups a user belongs to',
				action: 'Get groups for a user',
			},
			{
				name: 'Reset Factors',
				value: 'resetFactors',
				description: 'Reset all MFA factors for a user',
				action: 'Reset factors for a user',
			},
			{
				name: 'Reset Password',
				value: 'resetPassword',
				description: 'Generate a password reset link',
				action: 'Reset password for a user',
			},
			{
				name: 'Set Password',
				value: 'setPassword',
				description: 'Set a user\'s password directly',
				action: 'Set password for a user',
			},
			{
				name: 'Suspend',
				value: 'suspend',
				description: 'Suspend a user',
				action: 'Suspend a user',
			},
			{
				name: 'Unlock',
				value: 'unlock',
				description: 'Unlock a locked-out user',
				action: 'Unlock a user',
			},
			{
				name: 'Unsuspend',
				value: 'unsuspend',
				description: 'Unsuspend a user',
				action: 'Unsuspend a user',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a user',
				action: 'Update a user',
			},
		],
		default: 'get',
	},
];

export const userFields: INodeProperties[] = [
	// ----------------------------------
	//         user:create
	// ----------------------------------
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'User\'s first name',
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'User\'s last name',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'User\'s primary email address',
	},
	{
		displayName: 'Login',
		name: 'login',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'User\'s login (usually same as email)',
	},
	{
		displayName: 'Activate',
		name: 'activate',
		type: 'options',
		options: [
			{
				name: 'Activate Immediately',
				value: 'true',
			},
			{
				name: 'Create in Staged State',
				value: 'false',
			},
			{
				name: 'Send Activation Email',
				value: 'sendEmail',
			},
		],
		default: 'true',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'How to handle user activation',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Cost Center',
				name: 'costCenter',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Country Code',
				name: 'countryCode',
				type: 'string',
				default: '',
				description: 'ISO 3166-1 alpha-2 country code',
			},
			{
				displayName: 'Department',
				name: 'department',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Display Name',
				name: 'displayName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Division',
				name: 'division',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Employee Number',
				name: 'employeeNumber',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Group IDs',
				name: 'groupIds',
				type: 'string',
				default: '',
				description: 'Comma-separated list of group IDs to assign the user to',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				default: '',
				description: 'Language and locale (e.g., en_US)',
			},
			{
				displayName: 'Manager',
				name: 'manager',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Manager ID',
				name: 'managerId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Mobile Phone',
				name: 'mobilePhone',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Nick Name',
				name: 'nickName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Organization',
				name: 'organization',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Initial password for the user',
			},
			{
				displayName: 'Preferred Language',
				name: 'preferredLanguage',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Profile URL',
				name: 'profileUrl',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Recovery Answer',
				name: 'recoveryAnswer',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Recovery Question',
				name: 'recoveryQuestion',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Second Email',
				name: 'secondEmail',
				type: 'string',
				default: '',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Street Address',
				name: 'streetAddress',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
				description: 'IANA timezone (e.g., America/New_York)',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
			},
			{
				displayName: 'User Type',
				name: 'userType',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Zip Code',
				name: 'zipCode',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         user:get
	// ----------------------------------
	{
		displayName: 'User ID or Login',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get', 'update', 'delete', 'activate', 'deactivate', 'suspend', 'unsuspend', 'unlock', 'resetPassword', 'setPassword', 'expirePassword', 'clearSessions', 'getGroups', 'getApps', 'getFactors', 'resetFactors'],
			},
		},
		description: 'The user ID or login (email)',
	},

	// ----------------------------------
	//         user:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getAll'],
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
				resource: ['user'],
				operation: ['getAll'],
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
				resource: ['user'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Filter',
				name: 'filter',
				type: 'string',
				default: '',
				description: 'SCIM filter expression (e.g., status eq "ACTIVE")',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search expression for early matching',
			},
			{
				displayName: 'Query',
				name: 'q',
				type: 'string',
				default: '',
				description: 'Searches firstName, lastName, and email',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Deprovisioned', value: 'DEPROVISIONED' },
					{ name: 'Locked Out', value: 'LOCKED_OUT' },
					{ name: 'Password Expired', value: 'PASSWORD_EXPIRED' },
					{ name: 'Provisioned', value: 'PROVISIONED' },
					{ name: 'Recovery', value: 'RECOVERY' },
					{ name: 'Staged', value: 'STAGED' },
				],
				default: 'ACTIVE',
				description: 'Filter by user status',
			},
		],
	},

	// ----------------------------------
	//         user:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Cost Center',
				name: 'costCenter',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Country Code',
				name: 'countryCode',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Department',
				name: 'department',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Display Name',
				name: 'displayName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Division',
				name: 'division',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
			},
			{
				displayName: 'Employee Number',
				name: 'employeeNumber',
				type: 'string',
				default: '',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Locale',
				name: 'locale',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Login',
				name: 'login',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Manager',
				name: 'manager',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Manager ID',
				name: 'managerId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Mobile Phone',
				name: 'mobilePhone',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Nick Name',
				name: 'nickName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Organization',
				name: 'organization',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Preferred Language',
				name: 'preferredLanguage',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Profile URL',
				name: 'profileUrl',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Second Email',
				name: 'secondEmail',
				type: 'string',
				default: '',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Street Address',
				name: 'streetAddress',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
			},
			{
				displayName: 'User Type',
				name: 'userType',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Zip Code',
				name: 'zipCode',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//         user:activate
	// ----------------------------------
	{
		displayName: 'Send Email',
		name: 'sendEmail',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['activate'],
			},
		},
		description: 'Whether to send an activation email to the user',
	},

	// ----------------------------------
	//         user:setPassword
	// ----------------------------------
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		typeOptions: {
			password: true,
		},
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['setPassword'],
			},
		},
		description: 'The new password for the user',
	},
];
