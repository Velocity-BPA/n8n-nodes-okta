/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const eventHookOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['eventHook'],
			},
		},
		options: [
			{
				name: 'Activate',
				value: 'activate',
				description: 'Activate an event hook',
				action: 'Activate an event hook',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create an event hook',
				action: 'Create an event hook',
			},
			{
				name: 'Deactivate',
				value: 'deactivate',
				description: 'Deactivate an event hook',
				action: 'Deactivate an event hook',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an event hook',
				action: 'Delete an event hook',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an event hook',
				action: 'Get an event hook',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many event hooks',
				action: 'Get many event hooks',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an event hook',
				action: 'Update an event hook',
			},
			{
				name: 'Verify',
				value: 'verify',
				description: 'Verify an event hook endpoint',
				action: 'Verify an event hook',
			},
		],
		default: 'get',
	},
];

export const eventHookFields: INodeProperties[] = [
	// ----------------------------------
	//         eventHook:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['eventHook'],
				operation: ['create'],
			},
		},
		description: 'Name of the event hook',
	},
	{
		displayName: 'Webhook URL',
		name: 'uri',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'https://your-webhook-url.com/hook',
		displayOptions: {
			show: {
				resource: ['eventHook'],
				operation: ['create'],
			},
		},
		description: 'The URL to send event notifications to',
	},
	{
		displayName: 'Events',
		name: 'events',
		type: 'multiOptions',
		required: true,
		options: [
			{ name: 'Application User Membership Add', value: 'application.user_membership.add' },
			{ name: 'Application User Membership Remove', value: 'application.user_membership.remove' },
			{ name: 'Group User Membership Add', value: 'group.user_membership.add' },
			{ name: 'Group User Membership Remove', value: 'group.user_membership.remove' },
			{ name: 'User Account Lock', value: 'user.account.lock' },
			{ name: 'User Account Unlock', value: 'user.account.unlock' },
			{ name: 'User Lifecycle Activate', value: 'user.lifecycle.activate' },
			{ name: 'User Lifecycle Create', value: 'user.lifecycle.create' },
			{ name: 'User Lifecycle Deactivate', value: 'user.lifecycle.deactivate' },
			{ name: 'User Lifecycle Delete (Unlinked)', value: 'user.lifecycle.delete.initiated' },
			{ name: 'User Lifecycle Suspend', value: 'user.lifecycle.suspend' },
			{ name: 'User Lifecycle Unsuspend', value: 'user.lifecycle.unsuspend' },
			{ name: 'User MFA Factor Activate', value: 'user.mfa.factor.activate' },
			{ name: 'User MFA Factor Deactivate', value: 'user.mfa.factor.deactivate' },
			{ name: 'User MFA Factor Reset All', value: 'user.mfa.factor.reset_all' },
			{ name: 'User Session End', value: 'user.session.end' },
			{ name: 'User Session Start', value: 'user.session.start' },
		],
		default: [],
		displayOptions: {
			show: {
				resource: ['eventHook'],
				operation: ['create'],
			},
		},
		description: 'Events to subscribe to',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['eventHook'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Auth Header Name',
				name: 'authHeaderName',
				type: 'string',
				default: 'Authorization',
				description: 'Name of the authorization header',
			},
			{
				displayName: 'Auth Header Value',
				name: 'authHeaderValue',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Value of the authorization header',
			},
		],
	},

	// ----------------------------------
	//         eventHook:get/delete/activate/deactivate/verify
	// ----------------------------------
	{
		displayName: 'Event Hook ID',
		name: 'eventHookId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['eventHook'],
				operation: ['get', 'delete', 'activate', 'deactivate', 'verify', 'update'],
			},
		},
		description: 'The ID of the event hook',
	},

	// ----------------------------------
	//         eventHook:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['eventHook'],
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
				resource: ['eventHook'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         eventHook:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['eventHook'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Auth Header Name',
				name: 'authHeaderName',
				type: 'string',
				default: '',
				description: 'Name of the authorization header',
			},
			{
				displayName: 'Auth Header Value',
				name: 'authHeaderValue',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Value of the authorization header',
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{ name: 'Application User Membership Add', value: 'application.user_membership.add' },
					{ name: 'Application User Membership Remove', value: 'application.user_membership.remove' },
					{ name: 'Group User Membership Add', value: 'group.user_membership.add' },
					{ name: 'Group User Membership Remove', value: 'group.user_membership.remove' },
					{ name: 'User Account Lock', value: 'user.account.lock' },
					{ name: 'User Account Unlock', value: 'user.account.unlock' },
					{ name: 'User Lifecycle Activate', value: 'user.lifecycle.activate' },
					{ name: 'User Lifecycle Create', value: 'user.lifecycle.create' },
					{ name: 'User Lifecycle Deactivate', value: 'user.lifecycle.deactivate' },
					{ name: 'User Lifecycle Delete (Unlinked)', value: 'user.lifecycle.delete.initiated' },
					{ name: 'User Lifecycle Suspend', value: 'user.lifecycle.suspend' },
					{ name: 'User Lifecycle Unsuspend', value: 'user.lifecycle.unsuspend' },
					{ name: 'User MFA Factor Activate', value: 'user.mfa.factor.activate' },
					{ name: 'User MFA Factor Deactivate', value: 'user.mfa.factor.deactivate' },
					{ name: 'User MFA Factor Reset All', value: 'user.mfa.factor.reset_all' },
					{ name: 'User Session End', value: 'user.session.end' },
					{ name: 'User Session Start', value: 'user.session.start' },
				],
				default: [],
				description: 'Events to subscribe to',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the event hook',
			},
			{
				displayName: 'Webhook URL',
				name: 'uri',
				type: 'string',
				default: '',
				description: 'The URL to send event notifications to',
			},
		],
	},
];
