/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	OktaUser,
	OktaGroup,
	OktaPolicy,
	AuthorizationServer,
	UserStatus,
	GroupType,
	PolicyType,
} from '../../nodes/Okta/utils/types';

describe('Okta Types', () => {
	describe('OktaUser', () => {
		it('should accept valid user object', () => {
			const user: OktaUser = {
				id: 'user123',
				status: 'ACTIVE' as UserStatus,
				profile: {
					firstName: 'John',
					lastName: 'Doe',
					email: 'john@example.com',
					login: 'john@example.com',
				},
				created: '2024-01-01T00:00:00.000Z',
				activated: '2024-01-01T00:00:00.000Z',
				statusChanged: '2024-01-01T00:00:00.000Z',
				lastLogin: '2024-01-01T00:00:00.000Z',
				lastUpdated: '2024-01-01T00:00:00.000Z',
				passwordChanged: '2024-01-01T00:00:00.000Z',
				type: { id: 'type123' },
				credentials: {
					provider: { type: 'OKTA', name: 'OKTA' },
				},
				_links: {},
			};
			expect(user.id).toBe('user123');
			expect(user.status).toBe('ACTIVE');
			expect(user.profile.firstName).toBe('John');
		});

		it('should support all user statuses', () => {
			const statuses: UserStatus[] = [
				'STAGED',
				'PROVISIONED',
				'ACTIVE',
				'RECOVERY',
				'LOCKED_OUT',
				'PASSWORD_EXPIRED',
				'DEPROVISIONED',
			];
			statuses.forEach((status) => {
				const user: OktaUser = {
					id: 'user123',
					status,
					profile: {
						firstName: 'John',
						lastName: 'Doe',
						email: 'john@example.com',
						login: 'john@example.com',
					},
					created: '2024-01-01T00:00:00.000Z',
					activated: null,
					statusChanged: null,
					lastLogin: null,
					lastUpdated: '2024-01-01T00:00:00.000Z',
					passwordChanged: null,
					type: { id: 'type123' },
					credentials: {
						provider: { type: 'OKTA', name: 'OKTA' },
					},
					_links: {},
				};
				expect(user.status).toBe(status);
			});
		});
	});

	describe('OktaGroup', () => {
		it('should accept valid group object', () => {
			const group: OktaGroup = {
				id: 'group123',
				type: 'OKTA_GROUP' as GroupType,
				profile: {
					name: 'Test Group',
					description: 'A test group',
				},
				created: '2024-01-01T00:00:00.000Z',
				lastUpdated: '2024-01-01T00:00:00.000Z',
				lastMembershipUpdated: '2024-01-01T00:00:00.000Z',
				objectClass: ['okta:user_group'],
				_links: {},
			};
			expect(group.id).toBe('group123');
			expect(group.type).toBe('OKTA_GROUP');
			expect(group.profile.name).toBe('Test Group');
		});

		it('should support all group types', () => {
			const types: GroupType[] = ['OKTA_GROUP', 'APP_GROUP', 'BUILT_IN'];
			types.forEach((type) => {
				const group: OktaGroup = {
					id: 'group123',
					type,
					profile: {
						name: 'Test Group',
					},
					created: '2024-01-01T00:00:00.000Z',
					lastUpdated: '2024-01-01T00:00:00.000Z',
					lastMembershipUpdated: '2024-01-01T00:00:00.000Z',
					objectClass: ['okta:user_group'],
					_links: {},
				};
				expect(group.type).toBe(type);
			});
		});
	});

	describe('OktaPolicy', () => {
		it('should accept valid policy object', () => {
			const policy: OktaPolicy = {
				id: 'policy123',
				type: 'OKTA_SIGN_ON' as PolicyType,
				name: 'Test Policy',
				description: 'A test policy',
				status: 'ACTIVE',
				priority: 1,
				system: false,
				conditions: {},
				created: '2024-01-01T00:00:00.000Z',
				lastUpdated: '2024-01-01T00:00:00.000Z',
				_links: {},
			};
			expect(policy.id).toBe('policy123');
			expect(policy.type).toBe('OKTA_SIGN_ON');
			expect(policy.priority).toBe(1);
		});

		it('should support all policy types', () => {
			const types: PolicyType[] = [
				'OKTA_SIGN_ON',
				'PASSWORD',
				'MFA_ENROLL',
				'ACCESS_POLICY',
				'PROFILE_ENROLLMENT',
				'IDP_DISCOVERY',
			];
			types.forEach((type) => {
				const policy: OktaPolicy = {
					id: 'policy123',
					type,
					name: 'Test Policy',
					description: null,
					status: 'ACTIVE',
					priority: 1,
					system: false,
					conditions: {},
					created: '2024-01-01T00:00:00.000Z',
					lastUpdated: '2024-01-01T00:00:00.000Z',
					_links: {},
				};
				expect(policy.type).toBe(type);
			});
		});
	});

	describe('AuthorizationServer', () => {
		it('should accept valid auth server object', () => {
			const authServer: AuthorizationServer = {
				id: 'auth123',
				name: 'Test Auth Server',
				description: 'A test auth server',
				audiences: ['api://default'],
				issuer: 'https://example.okta.com/oauth2/auth123',
				issuerMode: 'ORG_URL',
				status: 'ACTIVE',
				created: '2024-01-01T00:00:00.000Z',
				lastUpdated: '2024-01-01T00:00:00.000Z',
				credentials: {
					signing: {
						rotationMode: 'AUTO',
						lastRotated: '2024-01-01T00:00:00.000Z',
						nextRotation: null,
						kid: 'kid123',
					},
				},
				_links: {},
			};
			expect(authServer.id).toBe('auth123');
			expect(authServer.audiences).toContain('api://default');
			expect(authServer.issuerMode).toBe('ORG_URL');
		});
	});
});
