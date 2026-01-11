/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const applicationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['application'],
			},
		},
		options: [
			{
				name: 'Activate',
				value: 'activate',
				description: 'Activate an application',
				action: 'Activate an application',
			},
			{
				name: 'Assign Group',
				value: 'assignGroup',
				description: 'Assign a group to an application',
				action: 'Assign group to application',
			},
			{
				name: 'Assign User',
				value: 'assignUser',
				description: 'Assign a user to an application',
				action: 'Assign user to application',
			},
			{
				name: 'Deactivate',
				value: 'deactivate',
				description: 'Deactivate an application',
				action: 'Deactivate an application',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an application',
				action: 'Delete an application',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an application by ID',
				action: 'Get an application',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many applications',
				action: 'Get many applications',
			},
			{
				name: 'Get Groups',
				value: 'getGroups',
				description: 'Get groups assigned to an application',
				action: 'Get groups for application',
			},
			{
				name: 'Get Users',
				value: 'getUsers',
				description: 'Get users assigned to an application',
				action: 'Get users for application',
			},
			{
				name: 'Remove Group',
				value: 'removeGroup',
				description: 'Remove a group from an application',
				action: 'Remove group from application',
			},
			{
				name: 'Remove User',
				value: 'removeUser',
				description: 'Remove a user from an application',
				action: 'Remove user from application',
			},
		],
		default: 'get',
	},
];

export const applicationFields: INodeProperties[] = [
	// ----------------------------------
	//         application:get, delete, activate, deactivate, getUsers, getGroups
	// ----------------------------------
	{
		displayName: 'Application ID',
		name: 'appId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['application'],
				operation: ['get', 'delete', 'activate', 'deactivate', 'getUsers', 'getGroups', 'assignUser', 'removeUser', 'assignGroup', 'removeGroup'],
			},
		},
		description: 'The ID of the application',
	},

	// ----------------------------------
	//         application:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['application'],
				operation: ['getAll', 'getUsers', 'getGroups'],
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
				resource: ['application'],
				operation: ['getAll', 'getUsers', 'getGroups'],
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
				resource: ['application'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Filter',
				name: 'filter',
				type: 'string',
				default: '',
				description: 'SCIM filter expression',
			},
			{
				displayName: 'Query',
				name: 'q',
				type: 'string',
				default: '',
				description: 'Search by application name or label',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Inactive', value: 'INACTIVE' },
				],
				default: '',
				description: 'Filter by application status',
			},
		],
	},

	// ----------------------------------
	//         application:assignUser, removeUser
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['application'],
				operation: ['assignUser', 'removeUser'],
			},
		},
		description: 'The ID of the user',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['application'],
				operation: ['assignUser'],
			},
		},
		options: [
			{
				displayName: 'Username',
				name: 'userName',
				type: 'string',
				default: '',
				description: 'Application-specific username',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Application-specific password',
			},
			{
				displayName: 'Profile (JSON)',
				name: 'profile',
				type: 'json',
				default: '{}',
				description: 'Application-specific profile as JSON',
			},
		],
	},

	// ----------------------------------
	//         application:assignGroup, removeGroup
	// ----------------------------------
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['application'],
				operation: ['assignGroup', 'removeGroup'],
			},
		},
		description: 'The ID of the group',
	},
];
