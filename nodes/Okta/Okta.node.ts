/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

// Import descriptions
import { userOperations, userFields } from './actions/user/user.description';
import { groupOperations, groupFields } from './actions/group/group.description';
import { applicationOperations, applicationFields } from './actions/application/application.description';
import { policyOperations, policyFields } from './actions/policy/policy.description';
import { authServerOperations, authServerFields } from './actions/authServer/authServer.description';
import { identityProviderOperations, identityProviderFields } from './actions/identityProvider/identityProvider.description';
import { systemLogOperations, systemLogFields } from './actions/systemLog/systemLog.description';
import { networkZoneOperations, networkZoneFields } from './actions/networkZone/networkZone.description';
import { eventHookOperations, eventHookFields } from './actions/eventHook/eventHook.description';
import { factorOperations, factorFields } from './actions/factor/factor.description';

// Import operations
import * as userOps from './actions/user/user.operations';
import * as groupOps from './actions/group/group.operations';
import * as applicationOps from './actions/application/application.operations';
import * as policyOps from './actions/policy/policy.operations';
import * as authServerOps from './actions/authServer/authServer.operations';
import * as identityProviderOps from './actions/identityProvider/identityProvider.operations';
import * as systemLogOps from './actions/systemLog/systemLog.operations';
import * as networkZoneOps from './actions/networkZone/networkZone.operations';
import * as eventHookOps from './actions/eventHook/eventHook.operations';
import * as factorOps from './actions/factor/factor.operations';

// Log licensing notice on load
console.warn(`
[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.
`);

export class Okta implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Okta',
		name: 'okta',
		icon: 'file:okta.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Okta Identity Management API',
		defaults: {
			name: 'Okta',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'oktaApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Application',
						value: 'application',
					},
					{
						name: 'Authorization Server',
						value: 'authServer',
					},
					{
						name: 'Event Hook',
						value: 'eventHook',
					},
					{
						name: 'Factor (MFA)',
						value: 'factor',
					},
					{
						name: 'Group',
						value: 'group',
					},
					{
						name: 'Identity Provider',
						value: 'identityProvider',
					},
					{
						name: 'Network Zone',
						value: 'networkZone',
					},
					{
						name: 'Policy',
						value: 'policy',
					},
					{
						name: 'System Log',
						value: 'systemLog',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'user',
			},
			// User
			...userOperations,
			...userFields,
			// Group
			...groupOperations,
			...groupFields,
			// Application
			...applicationOperations,
			...applicationFields,
			// Policy
			...policyOperations,
			...policyFields,
			// Authorization Server
			...authServerOperations,
			...authServerFields,
			// Identity Provider
			...identityProviderOperations,
			...identityProviderFields,
			// System Log
			...systemLogOperations,
			...systemLogFields,
			// Network Zone
			...networkZoneOperations,
			...networkZoneFields,
			// Event Hook
			...eventHookOperations,
			...eventHookFields,
			// Factor
			...factorOperations,
			...factorFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: INodeExecutionData[] = [];

				// User operations
				if (resource === 'user') {
					switch (operation) {
						case 'create':
							responseData = await userOps.create.call(this, i);
							break;
						case 'get':
							responseData = await userOps.get.call(this, i);
							break;
						case 'getAll':
							responseData = await userOps.getAll.call(this, i);
							break;
						case 'update':
							responseData = await userOps.update.call(this, i);
							break;
						case 'delete':
							responseData = await userOps.deleteUser.call(this, i);
							break;
						case 'activate':
							responseData = await userOps.activate.call(this, i);
							break;
						case 'deactivate':
							responseData = await userOps.deactivate.call(this, i);
							break;
						case 'suspend':
							responseData = await userOps.suspend.call(this, i);
							break;
						case 'unsuspend':
							responseData = await userOps.unsuspend.call(this, i);
							break;
						case 'unlock':
							responseData = await userOps.unlock.call(this, i);
							break;
						case 'resetPassword':
							responseData = await userOps.resetPassword.call(this, i);
							break;
						case 'setPassword':
							responseData = await userOps.setPassword.call(this, i);
							break;
						case 'expirePassword':
							responseData = await userOps.expirePassword.call(this, i);
							break;
						case 'clearSessions':
							responseData = await userOps.clearSessions.call(this, i);
							break;
						case 'getGroups':
							responseData = await userOps.getGroups.call(this, i);
							break;
						case 'getApps':
							responseData = await userOps.getApps.call(this, i);
							break;
						case 'getFactors':
							responseData = await userOps.getFactors.call(this, i);
							break;
						case 'resetFactors':
							responseData = await userOps.resetFactors.call(this, i);
							break;
					}
				}

				// Group operations
				if (resource === 'group') {
					switch (operation) {
						case 'create':
							responseData = await groupOps.create.call(this, i);
							break;
						case 'get':
							responseData = await groupOps.get.call(this, i);
							break;
						case 'getAll':
							responseData = await groupOps.getAll.call(this, i);
							break;
						case 'update':
							responseData = await groupOps.update.call(this, i);
							break;
						case 'delete':
							responseData = await groupOps.deleteGroup.call(this, i);
							break;
						case 'getMembers':
							responseData = await groupOps.getMembers.call(this, i);
							break;
						case 'addMember':
							responseData = await groupOps.addMember.call(this, i);
							break;
						case 'removeMember':
							responseData = await groupOps.removeMember.call(this, i);
							break;
						case 'getApps':
							responseData = await groupOps.getApps.call(this, i);
							break;
					}
				}

				// Application operations
				if (resource === 'application') {
					switch (operation) {
						case 'get':
							responseData = await applicationOps.get.call(this, i);
							break;
						case 'getAll':
							responseData = await applicationOps.getAll.call(this, i);
							break;
						case 'delete':
							responseData = await applicationOps.deleteApp.call(this, i);
							break;
						case 'activate':
							responseData = await applicationOps.activate.call(this, i);
							break;
						case 'deactivate':
							responseData = await applicationOps.deactivate.call(this, i);
							break;
						case 'getUsers':
							responseData = await applicationOps.getUsers.call(this, i);
							break;
						case 'assignUser':
							responseData = await applicationOps.assignUser.call(this, i);
							break;
						case 'removeUser':
							responseData = await applicationOps.removeUser.call(this, i);
							break;
						case 'getGroups':
							responseData = await applicationOps.getGroups.call(this, i);
							break;
						case 'assignGroup':
							responseData = await applicationOps.assignGroup.call(this, i);
							break;
						case 'removeGroup':
							responseData = await applicationOps.removeGroup.call(this, i);
							break;
					}
				}

				// Policy operations
				if (resource === 'policy') {
					switch (operation) {
						case 'create':
							responseData = await policyOps.create.call(this, i);
							break;
						case 'get':
							responseData = await policyOps.get.call(this, i);
							break;
						case 'getAll':
							responseData = await policyOps.getAll.call(this, i);
							break;
						case 'update':
							responseData = await policyOps.update.call(this, i);
							break;
						case 'delete':
							responseData = await policyOps.deletePolicy.call(this, i);
							break;
						case 'activate':
							responseData = await policyOps.activate.call(this, i);
							break;
						case 'deactivate':
							responseData = await policyOps.deactivate.call(this, i);
							break;
						case 'getRules':
							responseData = await policyOps.getRules.call(this, i);
							break;
						case 'createRule':
							responseData = await policyOps.createRule.call(this, i);
							break;
						case 'deleteRule':
							responseData = await policyOps.deleteRule.call(this, i);
							break;
					}
				}

				// Authorization Server operations
				if (resource === 'authServer') {
					switch (operation) {
						case 'create':
							responseData = await authServerOps.create.call(this, i);
							break;
						case 'get':
							responseData = await authServerOps.get.call(this, i);
							break;
						case 'getAll':
							responseData = await authServerOps.getAll.call(this, i);
							break;
						case 'update':
							responseData = await authServerOps.update.call(this, i);
							break;
						case 'delete':
							responseData = await authServerOps.deleteServer.call(this, i);
							break;
						case 'activate':
							responseData = await authServerOps.activate.call(this, i);
							break;
						case 'deactivate':
							responseData = await authServerOps.deactivate.call(this, i);
							break;
						case 'getScopes':
							responseData = await authServerOps.getScopes.call(this, i);
							break;
						case 'createScope':
							responseData = await authServerOps.createScope.call(this, i);
							break;
						case 'getClaims':
							responseData = await authServerOps.getClaims.call(this, i);
							break;
						case 'createClaim':
							responseData = await authServerOps.createClaim.call(this, i);
							break;
					}
				}

				// Identity Provider operations
				if (resource === 'identityProvider') {
					switch (operation) {
						case 'get':
							responseData = await identityProviderOps.get.call(this, i);
							break;
						case 'getAll':
							responseData = await identityProviderOps.getAll.call(this, i);
							break;
						case 'delete':
							responseData = await identityProviderOps.deleteIdp.call(this, i);
							break;
						case 'activate':
							responseData = await identityProviderOps.activate.call(this, i);
							break;
						case 'deactivate':
							responseData = await identityProviderOps.deactivate.call(this, i);
							break;
						case 'getLinkedUsers':
							responseData = await identityProviderOps.getLinkedUsers.call(this, i);
							break;
						case 'linkUser':
							responseData = await identityProviderOps.linkUser.call(this, i);
							break;
						case 'unlinkUser':
							responseData = await identityProviderOps.unlinkUser.call(this, i);
							break;
					}
				}

				// System Log operations
				if (resource === 'systemLog') {
					switch (operation) {
						case 'getAll':
							responseData = await systemLogOps.getAll.call(this, i);
							break;
						case 'search':
							responseData = await systemLogOps.search.call(this, i);
							break;
					}
				}

				// Network Zone operations
				if (resource === 'networkZone') {
					switch (operation) {
						case 'create':
							responseData = await networkZoneOps.create.call(this, i);
							break;
						case 'get':
							responseData = await networkZoneOps.get.call(this, i);
							break;
						case 'getAll':
							responseData = await networkZoneOps.getAll.call(this, i);
							break;
						case 'update':
							responseData = await networkZoneOps.update.call(this, i);
							break;
						case 'delete':
							responseData = await networkZoneOps.deleteZone.call(this, i);
							break;
					}
				}

				// Event Hook operations
				if (resource === 'eventHook') {
					switch (operation) {
						case 'create':
							responseData = await eventHookOps.create.call(this, i);
							break;
						case 'get':
							responseData = await eventHookOps.get.call(this, i);
							break;
						case 'getAll':
							responseData = await eventHookOps.getAll.call(this, i);
							break;
						case 'update':
							responseData = await eventHookOps.update.call(this, i);
							break;
						case 'delete':
							responseData = await eventHookOps.deleteHook.call(this, i);
							break;
						case 'activate':
							responseData = await eventHookOps.activate.call(this, i);
							break;
						case 'deactivate':
							responseData = await eventHookOps.deactivate.call(this, i);
							break;
						case 'verify':
							responseData = await eventHookOps.verify.call(this, i);
							break;
					}
				}

				// Factor operations
				if (resource === 'factor') {
					switch (operation) {
						case 'getSupported':
							responseData = await factorOps.getSupported.call(this, i);
							break;
						case 'getUserFactors':
							responseData = await factorOps.getUserFactors.call(this, i);
							break;
						case 'enroll':
							responseData = await factorOps.enroll.call(this, i);
							break;
						case 'activate':
							responseData = await factorOps.activate.call(this, i);
							break;
						case 'verify':
							responseData = await factorOps.verify.call(this, i);
							break;
						case 'delete':
							responseData = await factorOps.deleteFactor.call(this, i);
							break;
						case 'reset':
							responseData = await factorOps.reset.call(this, i);
							break;
						case 'getSecurityQuestions':
							responseData = await factorOps.getSecurityQuestions.call(this, i);
							break;
					}
				}

				returnData.push(...responseData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: (error as Error).message,
						},
						pairedItem: {
							item: i,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
