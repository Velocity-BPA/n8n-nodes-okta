/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';

export class OktaTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Okta Trigger',
		name: 'oktaTrigger',
		icon: 'file:okta.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].join(", ")}}',
		description: 'Handle Okta Event Hook webhooks',
		defaults: {
			name: 'Okta Trigger',
		},
		inputs: [],
		outputs: ['main'],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
			{
				name: 'setup',
				httpMethod: 'GET',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				options: [
					{
						name: 'Application User Membership Add',
						value: 'application.user_membership.add',
					},
					{
						name: 'Application User Membership Remove',
						value: 'application.user_membership.remove',
					},
					{
						name: 'Group User Membership Add',
						value: 'group.user_membership.add',
					},
					{
						name: 'Group User Membership Remove',
						value: 'group.user_membership.remove',
					},
					{
						name: 'User Account Lock',
						value: 'user.account.lock',
					},
					{
						name: 'User Account Unlock',
						value: 'user.account.unlock',
					},
					{
						name: 'User Lifecycle Activate',
						value: 'user.lifecycle.activate',
					},
					{
						name: 'User Lifecycle Create',
						value: 'user.lifecycle.create',
					},
					{
						name: 'User Lifecycle Deactivate',
						value: 'user.lifecycle.deactivate',
					},
					{
						name: 'User Lifecycle Delete (Unlinked)',
						value: 'user.lifecycle.delete.initiated',
					},
					{
						name: 'User Lifecycle Suspend',
						value: 'user.lifecycle.suspend',
					},
					{
						name: 'User Lifecycle Unsuspend',
						value: 'user.lifecycle.unsuspend',
					},
					{
						name: 'User MFA Factor Activate',
						value: 'user.mfa.factor.activate',
					},
					{
						name: 'User MFA Factor Deactivate',
						value: 'user.mfa.factor.deactivate',
					},
					{
						name: 'User MFA Factor Reset All',
						value: 'user.mfa.factor.reset_all',
					},
					{
						name: 'User Session End',
						value: 'user.session.end',
					},
					{
						name: 'User Session Start',
						value: 'user.session.start',
					},
				],
				default: [],
				description: 'The events to listen to (for documentation purposes only - configure in Okta Admin Console)',
			},
			{
				displayName: 'Note',
				name: 'note',
				type: 'notice',
				default: '',
				displayOptions: {
					show: {},
				},
				// eslint-disable-next-line n8n-nodes-base/node-param-description-unneeded-backticks
				description: `To use this trigger:
1. Copy the Webhook URL below
2. In Okta Admin Console, go to Workflow > Event Hooks
3. Create a new Event Hook with the webhook URL
4. Subscribe to the desired events
5. Okta will send a verification request automatically`,
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				// Event hooks are managed in Okta Admin Console
				// This just needs to return true to indicate the webhook endpoint exists
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				// Event hooks are managed in Okta Admin Console
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				// Event hooks are managed in Okta Admin Console
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const webhookName = this.getWebhookName();

		// Handle Okta one-time verification challenge
		if (webhookName === 'setup' || req.method === 'GET') {
			const verificationHeader = req.headers['x-okta-verification-challenge'] as string | undefined;
			
			if (verificationHeader) {
				// Respond to Okta verification challenge
				return {
					webhookResponse: {
						status: 200,
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							verification: verificationHeader,
						}),
					},
				};
			}
		}

		// Handle actual event hook POST
		const body = this.getBodyData() as IDataObject;
		const data = body?.data as IDataObject | undefined;
		const events = (data?.events as IDataObject[] | undefined) || [];
		const selectedEvents = this.getNodeParameter('events', []) as string[];

		// Filter events if specific events are selected
		let filteredEvents = events;
		if (selectedEvents.length > 0) {
			filteredEvents = events.filter((event) =>
				selectedEvents.includes(event.eventType as string),
			);
		}

		// If no matching events, acknowledge but don't trigger workflow
		if (filteredEvents.length === 0) {
			return {
				webhookResponse: {
					status: 200,
					body: '',
				},
			};
		}

		// Return each event as a separate item
		return {
			workflowData: [
				filteredEvents.map((event) => ({
					json: event,
				})),
			],
		};
	}
}
