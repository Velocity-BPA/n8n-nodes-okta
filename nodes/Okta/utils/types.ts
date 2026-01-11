/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

export type OktaResource =
	| 'user'
	| 'group'
	| 'application'
	| 'policy'
	| 'authServer'
	| 'identityProvider'
	| 'systemLog'
	| 'networkZone'
	| 'eventHook'
	| 'factor';

// User types
export type UserStatus =
	| 'STAGED'
	| 'PROVISIONED'
	| 'ACTIVE'
	| 'RECOVERY'
	| 'LOCKED_OUT'
	| 'PASSWORD_EXPIRED'
	| 'DEPROVISIONED';

export interface UserProfile {
	firstName?: string;
	lastName?: string;
	email?: string;
	login?: string;
	mobilePhone?: string;
	secondEmail?: string;
	displayName?: string;
	nickName?: string;
	profileUrl?: string;
	title?: string;
	employeeNumber?: string;
	costCenter?: string;
	organization?: string;
	division?: string;
	department?: string;
	managerId?: string;
	manager?: string;
	streetAddress?: string;
	city?: string;
	state?: string;
	zipCode?: string;
	countryCode?: string;
	preferredLanguage?: string;
	locale?: string;
	timezone?: string;
	userType?: string;
}

export interface OktaUser {
	id: string;
	status: UserStatus;
	created: string;
	activated: string | null;
	statusChanged: string | null;
	lastLogin: string | null;
	lastUpdated: string;
	passwordChanged: string | null;
	type: {
		id: string;
	};
	profile: UserProfile;
	credentials: {
		password?: Record<string, unknown>;
		recovery_question?: {
			question: string;
		};
		provider: {
			type: string;
			name: string;
		};
	};
	_links: Record<string, unknown>;
}

// Group types
export type GroupType = 'OKTA_GROUP' | 'APP_GROUP' | 'BUILT_IN';

export interface GroupProfile {
	name: string;
	description?: string;
}

export interface OktaGroup {
	id: string;
	created: string;
	lastUpdated: string;
	lastMembershipUpdated: string;
	objectClass: string[];
	type: GroupType;
	profile: GroupProfile;
	_links: Record<string, unknown>;
}

// Application types
export type SignOnMode =
	| 'BROWSER_PLUGIN'
	| 'BOOKMARK'
	| 'BASIC_AUTH'
	| 'SAML_2_0'
	| 'OPENID_CONNECT'
	| 'WS_FEDERATION'
	| 'AUTO_LOGIN';

export interface OktaApplication {
	id: string;
	name: string;
	label: string;
	status: 'ACTIVE' | 'INACTIVE';
	lastUpdated: string;
	created: string;
	accessibility: {
		selfService: boolean;
		errorRedirectUrl: string | null;
		loginRedirectUrl: string | null;
	};
	visibility: {
		autoSubmitToolbar: boolean;
		hide: {
			iOS: boolean;
			web: boolean;
		};
		appLinks: Record<string, boolean>;
	};
	features: string[];
	signOnMode: SignOnMode;
	credentials: Record<string, unknown>;
	settings: Record<string, unknown>;
	_links: Record<string, unknown>;
}

// Policy types
export type PolicyType =
	| 'OKTA_SIGN_ON'
	| 'PASSWORD'
	| 'MFA_ENROLL'
	| 'ACCESS_POLICY'
	| 'PROFILE_ENROLLMENT'
	| 'IDP_DISCOVERY';

export interface OktaPolicy {
	id: string;
	status: 'ACTIVE' | 'INACTIVE';
	name: string;
	description: string | null;
	priority: number;
	system: boolean;
	conditions: Record<string, unknown>;
	created: string;
	lastUpdated: string;
	type: PolicyType;
	_links: Record<string, unknown>;
}

export interface PolicyRule {
	id: string;
	status: 'ACTIVE' | 'INACTIVE';
	name: string;
	priority: number;
	system: boolean;
	conditions: Record<string, unknown>;
	actions: Record<string, unknown>;
	created: string;
	lastUpdated: string;
	type: string;
}

// Authorization Server types
export interface AuthorizationServer {
	id: string;
	name: string;
	description: string | null;
	audiences: string[];
	issuer: string;
	issuerMode: 'CUSTOM_URL' | 'ORG_URL';
	status: 'ACTIVE' | 'INACTIVE';
	created: string;
	lastUpdated: string;
	credentials: {
		signing: {
			rotationMode: string;
			lastRotated: string;
			nextRotation: string | null;
			kid: string;
		};
	};
	_links: Record<string, unknown>;
}

export interface AuthServerScope {
	id: string;
	name: string;
	description: string | null;
	system: boolean;
	default: boolean;
	displayName: string | null;
	consent: 'REQUIRED' | 'IMPLICIT';
	metadataPublish: 'NO_CLIENTS' | 'ALL_CLIENTS';
}

export interface AuthServerClaim {
	id: string;
	name: string;
	status: 'ACTIVE' | 'INACTIVE';
	claimType: 'RESOURCE' | 'IDENTITY';
	valueType: 'EXPRESSION' | 'GROUPS';
	value: string;
	alwaysIncludeInToken: boolean;
	conditions: {
		scopes: string[];
	};
	system: boolean;
	group_filter_type?: string;
}

// Identity Provider types
export type IdpType =
	| 'SAML2'
	| 'OIDC'
	| 'GOOGLE'
	| 'FACEBOOK'
	| 'LINKEDIN'
	| 'MICROSOFT'
	| 'APPLE';

export interface IdentityProvider {
	id: string;
	type: IdpType;
	name: string;
	status: 'ACTIVE' | 'INACTIVE';
	created: string;
	lastUpdated: string;
	protocol: Record<string, unknown>;
	policy: Record<string, unknown>;
	_links: Record<string, unknown>;
}

// System Log types
export interface SystemLogEvent {
	uuid: string;
	published: string;
	eventType: string;
	version: string;
	severity: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
	legacyEventType: string | null;
	displayMessage: string | null;
	actor: {
		id: string;
		type: string;
		alternateId: string | null;
		displayName: string | null;
		detailEntry: Record<string, unknown> | null;
	};
	client: {
		userAgent: {
			rawUserAgent: string | null;
			os: string | null;
			browser: string | null;
		};
		zone: string | null;
		device: string | null;
		id: string | null;
		ipAddress: string | null;
		geographicalContext: {
			city: string | null;
			state: string | null;
			country: string | null;
			postalCode: string | null;
			geolocation: {
				lat: number | null;
				lon: number | null;
			} | null;
		} | null;
	};
	outcome: {
		result: 'SUCCESS' | 'FAILURE' | 'SKIPPED' | 'UNKNOWN';
		reason: string | null;
	};
	target: Array<{
		id: string;
		type: string;
		alternateId: string | null;
		displayName: string | null;
		detailEntry: Record<string, unknown> | null;
	}> | null;
	transaction: {
		type: 'WEB' | 'JOB';
		id: string | null;
		detail: Record<string, unknown> | null;
	};
	debugContext: {
		debugData: Record<string, unknown> | null;
	};
	authenticationContext: {
		authenticationProvider: string | null;
		credentialProvider: string | null;
		credentialType: string | null;
		issuer: Record<string, unknown> | null;
		interface: string | null;
		authenticationStep: number;
		externalSessionId: string | null;
	};
	securityContext: {
		asNumber: number | null;
		asOrg: string | null;
		isp: string | null;
		domain: string | null;
		isProxy: boolean | null;
	};
	request: {
		ipChain: Array<{
			ip: string;
			geographicalContext: Record<string, unknown> | null;
			version: string;
			source: string | null;
		}>;
	};
}

// Network Zone types
export type NetworkZoneType = 'IP' | 'DYNAMIC';

export interface NetworkZone {
	id: string;
	name: string;
	type: NetworkZoneType;
	status: 'ACTIVE' | 'INACTIVE';
	usage: 'POLICY' | 'BLOCKLIST';
	created: string;
	lastUpdated: string;
	system: boolean;
	gateways?: Array<{
		type: 'CIDR' | 'RANGE';
		value: string;
	}>;
	proxies?: Array<{
		type: 'CIDR' | 'RANGE';
		value: string;
	}>;
	locations?: Array<{
		country: string;
		region?: string;
	}>;
	asns?: string[];
	proxyType?: string;
	_links: Record<string, unknown>;
}

// Event Hook types
export interface EventHook {
	id: string;
	name: string;
	status: 'ACTIVE' | 'INACTIVE' | 'VERIFIED';
	verificationStatus: 'UNVERIFIED' | 'VERIFIED';
	events: {
		type: 'EVENT_TYPE';
		items: string[];
	};
	channel: {
		type: 'HTTP';
		version: string;
		config: {
			uri: string;
			headers?: Array<{
				key: string;
				value: string;
			}>;
			authScheme?: {
				type: 'HEADER';
				key: string;
				value?: string;
			};
		};
	};
	created: string;
	lastUpdated: string;
	createdBy: string;
	_links: Record<string, unknown>;
}

// Factor types
export type FactorType =
	| 'sms'
	| 'call'
	| 'email'
	| 'push'
	| 'token:software:totp'
	| 'token:hotp'
	| 'token:hardware'
	| 'webauthn'
	| 'u2f'
	| 'question';

export type FactorProvider =
	| 'OKTA'
	| 'GOOGLE'
	| 'RSA'
	| 'SYMANTEC'
	| 'YUBICO'
	| 'DUO'
	| 'FIDO';

export interface Factor {
	id: string;
	factorType: FactorType;
	provider: FactorProvider;
	vendorName: string;
	status: 'NOT_SETUP' | 'PENDING_ACTIVATION' | 'ENROLLED' | 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
	created: string;
	lastUpdated: string;
	profile?: Record<string, unknown>;
	_links: Record<string, unknown>;
}

// API Response types
export interface OktaApiError {
	errorCode: string;
	errorSummary: string;
	errorLink: string;
	errorId: string;
	errorCauses: Array<{
		errorSummary: string;
	}>;
}

// Pagination types
export interface PaginationOptions {
	limit?: number;
	after?: string;
}

// Request options
export interface OktaRequestOptions {
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	endpoint: string;
	body?: Record<string, unknown>;
	query?: Record<string, string | number | boolean | undefined>;
	headers?: Record<string, string>;
}
