/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

export const OKTA_API_VERSION = 'v1';

export const USER_STATUS_OPTIONS = [
	{ name: 'Staged', value: 'STAGED' },
	{ name: 'Provisioned', value: 'PROVISIONED' },
	{ name: 'Active', value: 'ACTIVE' },
	{ name: 'Recovery', value: 'RECOVERY' },
	{ name: 'Locked Out', value: 'LOCKED_OUT' },
	{ name: 'Password Expired', value: 'PASSWORD_EXPIRED' },
	{ name: 'Deprovisioned', value: 'DEPROVISIONED' },
];

export const GROUP_TYPE_OPTIONS = [
	{ name: 'Okta Group', value: 'OKTA_GROUP' },
	{ name: 'App Group', value: 'APP_GROUP' },
	{ name: 'Built-In', value: 'BUILT_IN' },
];

export const SIGN_ON_MODE_OPTIONS = [
	{ name: 'Browser Plugin', value: 'BROWSER_PLUGIN' },
	{ name: 'Bookmark', value: 'BOOKMARK' },
	{ name: 'Basic Auth', value: 'BASIC_AUTH' },
	{ name: 'SAML 2.0', value: 'SAML_2_0' },
	{ name: 'OpenID Connect', value: 'OPENID_CONNECT' },
	{ name: 'WS-Federation', value: 'WS_FEDERATION' },
	{ name: 'Auto Login', value: 'AUTO_LOGIN' },
];

export const POLICY_TYPE_OPTIONS = [
	{ name: 'Okta Sign-On', value: 'OKTA_SIGN_ON' },
	{ name: 'Password', value: 'PASSWORD' },
	{ name: 'MFA Enrollment', value: 'MFA_ENROLL' },
	{ name: 'Access Policy', value: 'ACCESS_POLICY' },
	{ name: 'Profile Enrollment', value: 'PROFILE_ENROLLMENT' },
	{ name: 'IdP Discovery', value: 'IDP_DISCOVERY' },
];

export const IDP_TYPE_OPTIONS = [
	{ name: 'SAML 2.0', value: 'SAML2' },
	{ name: 'OpenID Connect', value: 'OIDC' },
	{ name: 'Google', value: 'GOOGLE' },
	{ name: 'Facebook', value: 'FACEBOOK' },
	{ name: 'LinkedIn', value: 'LINKEDIN' },
	{ name: 'Microsoft', value: 'MICROSOFT' },
	{ name: 'Apple', value: 'APPLE' },
];

export const NETWORK_ZONE_TYPE_OPTIONS = [
	{ name: 'IP', value: 'IP' },
	{ name: 'Dynamic', value: 'DYNAMIC' },
];

export const FACTOR_TYPE_OPTIONS = [
	{ name: 'SMS', value: 'sms' },
	{ name: 'Voice Call', value: 'call' },
	{ name: 'Email', value: 'email' },
	{ name: 'Okta Verify Push', value: 'push' },
	{ name: 'Google Authenticator (TOTP)', value: 'token:software:totp' },
	{ name: 'HOTP Token', value: 'token:hotp' },
	{ name: 'Hardware Token', value: 'token:hardware' },
	{ name: 'WebAuthn', value: 'webauthn' },
	{ name: 'U2F', value: 'u2f' },
	{ name: 'Security Question', value: 'question' },
];

export const FACTOR_PROVIDER_OPTIONS = [
	{ name: 'Okta', value: 'OKTA' },
	{ name: 'Google', value: 'GOOGLE' },
	{ name: 'RSA', value: 'RSA' },
	{ name: 'Symantec', value: 'SYMANTEC' },
	{ name: 'Yubico', value: 'YUBICO' },
	{ name: 'Duo', value: 'DUO' },
	{ name: 'FIDO', value: 'FIDO' },
];

export const EVENT_HOOK_EVENTS = [
	'user.lifecycle.create',
	'user.lifecycle.activate',
	'user.lifecycle.deactivate',
	'user.lifecycle.delete',
	'user.lifecycle.suspend',
	'user.lifecycle.unsuspend',
	'user.session.start',
	'user.session.end',
	'user.account.lock',
	'user.account.unlock',
	'user.mfa.factor.activate',
	'user.mfa.factor.deactivate',
	'user.mfa.factor.reset_all',
	'user.mfa.factor.update',
	'application.user_membership.add',
	'application.user_membership.remove',
	'group.user_membership.add',
	'group.user_membership.remove',
	'policy.lifecycle.create',
	'policy.lifecycle.update',
	'policy.lifecycle.delete',
	'policy.lifecycle.activate',
	'policy.lifecycle.deactivate',
];

export const SYSTEM_LOG_CATEGORIES = [
	'application.lifecycle',
	'user.lifecycle',
	'user.session',
	'user.authentication',
	'policy.lifecycle',
	'system.org.rate_limit',
];

export const ERROR_CODES: Record<string, string> = {
	E0000001: 'API validation failed',
	E0000003: 'Resource not found',
	E0000004: 'Authentication failed',
	E0000006: 'Insufficient permissions',
	E0000011: 'Invalid token',
	E0000014: 'Factor not verified',
	E0000047: 'API call exceeded rate limit',
	E0000007: 'Not found',
	E0000008: 'Internal error',
	E0000009: 'Internal error',
	E0000010: 'Service temporarily unavailable',
	E0000015: 'Conflict',
	E0000016: 'Activation failed',
	E0000017: 'Reset password failed',
	E0000018: 'Deactivate user failed',
	E0000019: 'Delete user failed',
	E0000020: 'User not found',
	E0000021: 'Bad request',
	E0000022: 'Operation not allowed',
};

export const DEFAULT_LIMIT = 200;
export const MAX_LIMIT = 1000;
