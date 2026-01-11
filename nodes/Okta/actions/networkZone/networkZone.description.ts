/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const networkZoneOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['networkZone'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a network zone',
				action: 'Create a network zone',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a network zone',
				action: 'Delete a network zone',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a network zone',
				action: 'Get a network zone',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many network zones',
				action: 'Get many network zones',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a network zone',
				action: 'Update a network zone',
			},
		],
		default: 'get',
	},
];

export const networkZoneFields: INodeProperties[] = [
	// ----------------------------------
	//         networkZone:create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['networkZone'],
				operation: ['create'],
			},
		},
		description: 'Name of the network zone',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		options: [
			{ name: 'IP', value: 'IP' },
			{ name: 'Dynamic', value: 'DYNAMIC' },
		],
		default: 'IP',
		displayOptions: {
			show: {
				resource: ['networkZone'],
				operation: ['create'],
			},
		},
		description: 'Type of network zone',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['networkZone'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'ASNs',
				name: 'asns',
				type: 'string',
				default: '',
				description: 'Comma-separated list of Autonomous System Numbers (for DYNAMIC zones)',
			},
			{
				displayName: 'Gateways',
				name: 'gateways',
				type: 'string',
				default: '',
				description: 'Comma-separated list of IP addresses or CIDR ranges (for IP zones)',
			},
			{
				displayName: 'Locations',
				name: 'locations',
				type: 'json',
				default: '[]',
				description: 'Array of geographic locations (for DYNAMIC zones). Example: [{"country":"US","region":"CA"}]',
			},
			{
				displayName: 'Proxies',
				name: 'proxies',
				type: 'string',
				default: '',
				description: 'Comma-separated list of proxy IP addresses or CIDR ranges',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Inactive', value: 'INACTIVE' },
				],
				default: 'ACTIVE',
				description: 'Status of the network zone',
			},
			{
				displayName: 'Usage',
				name: 'usage',
				type: 'options',
				options: [
					{ name: 'Policy', value: 'POLICY' },
					{ name: 'Blocklist', value: 'BLOCKLIST' },
				],
				default: 'POLICY',
				description: 'Usage type for the zone',
			},
		],
	},

	// ----------------------------------
	//         networkZone:get
	// ----------------------------------
	{
		displayName: 'Zone ID',
		name: 'zoneId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['networkZone'],
				operation: ['get', 'delete', 'update'],
			},
		},
		description: 'The ID of the network zone',
	},

	// ----------------------------------
	//         networkZone:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['networkZone'],
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
				resource: ['networkZone'],
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
				resource: ['networkZone'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Filter',
				name: 'filter',
				type: 'string',
				default: '',
				description: 'SCIM filter expression (e.g., type eq "IP")',
			},
		],
	},

	// ----------------------------------
	//         networkZone:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['networkZone'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'ASNs',
				name: 'asns',
				type: 'string',
				default: '',
				description: 'Comma-separated list of Autonomous System Numbers (for DYNAMIC zones)',
			},
			{
				displayName: 'Gateways',
				name: 'gateways',
				type: 'string',
				default: '',
				description: 'Comma-separated list of IP addresses or CIDR ranges (for IP zones)',
			},
			{
				displayName: 'Locations',
				name: 'locations',
				type: 'json',
				default: '[]',
				description: 'Array of geographic locations (for DYNAMIC zones)',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name of the network zone',
			},
			{
				displayName: 'Proxies',
				name: 'proxies',
				type: 'string',
				default: '',
				description: 'Comma-separated list of proxy IP addresses or CIDR ranges',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Inactive', value: 'INACTIVE' },
				],
				default: 'ACTIVE',
				description: 'Status of the network zone',
			},
		],
	},
];
