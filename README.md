# n8n-nodes-okta

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for **Okta**, the enterprise identity and access management platform. This node provides full integration with Okta's Core API, enabling workflow automation for user lifecycle management, groups, applications, policies, multi-factor authentication, and system administration.

![n8n](https://img.shields.io/badge/n8n-community%20node-orange)
![Okta](https://img.shields.io/badge/Okta-API%20v1-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## Features

- **Complete User Lifecycle Management**: Create, activate, suspend, deactivate, delete users, manage passwords, and clear sessions
- **Group Management**: Create and manage groups, add/remove members, assign applications
- **Application Integration**: Manage application assignments for users and groups
- **Policy Administration**: Create and manage sign-on, password, MFA, and access policies
- **Authorization Server Management**: Configure OAuth 2.0 authorization servers, scopes, and claims
- **Identity Provider Integration**: Manage SAML, OIDC, and social identity providers
- **Multi-Factor Authentication**: Enroll, activate, verify, and manage MFA factors
- **System Log Access**: Search and retrieve Okta system log events
- **Network Zone Management**: Configure IP and dynamic network zones
- **Event Hooks**: Create webhooks for real-time event notifications
- **Event Trigger**: Receive real-time notifications via Okta Event Hooks

## Installation

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-okta`
5. Click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the node
npm install n8n-nodes-okta
```

### Development Installation

```bash
# Clone the repository
git clone https://github.com/Velocity-BPA/n8n-nodes-okta.git
cd n8n-nodes-okta

# Install dependencies
npm install

# Build the project
npm run build

# Create symlink to n8n custom nodes directory
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-okta

# Restart n8n
n8n start
```

## Credentials Setup

### SSWS API Token (Recommended for Development)

| Field | Description |
|-------|-------------|
| **Organization URL** | Your Okta organization URL (e.g., `https://your-org.okta.com`) |
| **API Token** | SSWS API token from Admin Console > Security > API > Tokens |
| **Authentication Method** | Select "API Token" |

### OAuth 2.0 (Recommended for Production)

| Field | Description |
|-------|-------------|
| **Organization URL** | Your Okta organization URL |
| **Client ID** | OAuth 2.0 client ID from your service app |
| **Private Key** | Private key (PEM format) for JWT authentication |
| **Scopes** | Space-separated OAuth scopes (e.g., `okta.users.read okta.users.manage`) |
| **Authentication Method** | Select "OAuth 2.0" |

## Resources & Operations

### User
| Operation | Description |
|-----------|-------------|
| Create | Create a new user with optional activation |
| Get | Retrieve user by ID or login |
| Get All | List all users with search/filter support |
| Update | Update user profile |
| Delete | Permanently delete a user |
| Activate | Activate a user account |
| Deactivate | Deactivate a user account |
| Suspend | Suspend a user |
| Unsuspend | Unsuspend a user |
| Unlock | Unlock a locked-out user |
| Reset Password | Generate password reset link |
| Set Password | Set user password directly |
| Expire Password | Force password change on next login |
| Clear Sessions | Terminate all user sessions |
| Get Groups | List user's group memberships |
| Get Apps | List user's application assignments |
| Get Factors | List enrolled MFA factors |
| Reset Factors | Reset all MFA factors |

### Group
| Operation | Description |
|-----------|-------------|
| Create | Create a new Okta group |
| Get | Retrieve group by ID |
| Get All | List all groups |
| Update | Update group properties |
| Delete | Remove a group |
| Get Members | List users in a group |
| Add Member | Add user to group |
| Remove Member | Remove user from group |
| Get Apps | List apps assigned to group |

### Application
| Operation | Description |
|-----------|-------------|
| Get | Retrieve application by ID |
| Get All | List all applications |
| Delete | Remove an application |
| Activate | Activate an application |
| Deactivate | Deactivate an application |
| Get Users | List users assigned to app |
| Assign User | Assign user to application |
| Remove User | Remove user assignment |
| Get Groups | List groups assigned to app |
| Assign Group | Assign group to application |
| Remove Group | Remove group assignment |

### Policy
| Operation | Description |
|-----------|-------------|
| Create | Create a new policy |
| Get | Retrieve policy by ID |
| Get All | List policies by type |
| Update | Update policy settings |
| Delete | Remove a policy |
| Activate | Activate a policy |
| Deactivate | Deactivate a policy |
| Get Rules | List policy rules |
| Create Rule | Add rule to policy |
| Delete Rule | Remove a rule |

### Authorization Server
| Operation | Description |
|-----------|-------------|
| Create | Create authorization server |
| Get | Retrieve auth server by ID |
| Get All | List all auth servers |
| Update | Update auth server |
| Delete | Remove auth server |
| Activate | Activate auth server |
| Deactivate | Deactivate auth server |
| Get Scopes | List scopes |
| Create Scope | Create a new scope |
| Get Claims | List custom claims |
| Create Claim | Create a new claim |

### Identity Provider
| Operation | Description |
|-----------|-------------|
| Get | Retrieve IdP by ID |
| Get All | List all identity providers |
| Delete | Remove identity provider |
| Activate | Activate IdP |
| Deactivate | Deactivate IdP |
| Get Linked Users | List users linked to IdP |
| Link User | Link user to IdP |
| Unlink User | Unlink user from IdP |

### System Log
| Operation | Description |
|-----------|-------------|
| Get All | Retrieve log events with filters |
| Search | Search logs with SCIM filter |

### Network Zone
| Operation | Description |
|-----------|-------------|
| Create | Create network zone (IP or Dynamic) |
| Get | Retrieve zone by ID |
| Get All | List all network zones |
| Update | Update zone settings |
| Delete | Remove a zone |

### Event Hook
| Operation | Description |
|-----------|-------------|
| Create | Create webhook for events |
| Get | Retrieve hook by ID |
| Get All | List all event hooks |
| Update | Update hook configuration |
| Delete | Remove event hook |
| Activate | Activate hook |
| Deactivate | Deactivate hook |
| Verify | Verify hook endpoint |

### Factor (MFA)
| Operation | Description |
|-----------|-------------|
| Get Supported | List supported factor types |
| Get User Factors | List enrolled factors |
| Enroll | Enroll new MFA factor |
| Activate | Complete factor enrollment |
| Verify | Verify factor challenge |
| Delete | Remove factor enrollment |
| Reset | Reset all factors |
| Get Security Questions | Get available questions |

## Trigger Node

The **Okta Trigger** node receives real-time events via Okta Event Hooks:

| Event | Description |
|-------|-------------|
| User Lifecycle Events | Create, activate, deactivate, suspend, unsuspend, delete |
| User Session Events | Session start, session end |
| User Account Events | Lock, unlock |
| User MFA Events | Factor activate, deactivate, reset |
| Application Events | User membership add/remove |
| Group Events | User membership add/remove |

## Usage Examples

### Create a User with Group Assignment

```javascript
// Using the Okta node to create a user
{
  "resource": "user",
  "operation": "create",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "login": "john.doe@example.com",
  "groupIds": ["00g1234567890"]
}
```

### Search Users by Department

```javascript
// List users filtered by department
{
  "resource": "user",
  "operation": "getAll",
  "filter": "profile.department eq \"Engineering\""
}
```

### Enroll SMS MFA Factor

```javascript
// Enroll SMS factor for a user
{
  "resource": "factor",
  "operation": "enroll",
  "userId": "00u1234567890",
  "factorType": "sms",
  "provider": "OKTA",
  "phoneNumber": "+1-555-555-5555"
}
```

## Okta Concepts

### User Statuses
- **STAGED**: User created without activation
- **PROVISIONED**: Pending user action
- **ACTIVE**: Active user
- **RECOVERY**: Password reset pending
- **LOCKED_OUT**: Exceeded failed login attempts
- **PASSWORD_EXPIRED**: Password has expired
- **DEPROVISIONED**: Deactivated user

### Group Types
- **OKTA_GROUP**: Standard Okta-managed group
- **APP_GROUP**: Imported from application (read-only)
- **BUILT_IN**: System groups (e.g., Everyone)

### Factor Types
- **sms**: SMS verification
- **call**: Voice call verification
- **email**: Email verification
- **push**: Okta Verify push notification
- **token:software:totp**: TOTP authenticator apps
- **webauthn**: WebAuthn/FIDO2
- **question**: Security question

## Error Handling

The node handles Okta API errors with detailed messages:

| Error Code | Description |
|------------|-------------|
| E0000001 | API validation failed |
| E0000003 | Resource not found |
| E0000004 | Authentication failed |
| E0000006 | Insufficient permissions |
| E0000011 | Invalid token |
| E0000014 | Factor not verified |
| E0000047 | Rate limit exceeded |

## Rate Limiting

The node implements automatic rate limit handling:
- Monitors `X-Rate-Limit-Remaining` header
- Implements exponential backoff on 429 responses
- Respects `X-Rate-Limit-Reset` timestamps

## Security Best Practices

1. **Use OAuth 2.0** for production deployments
2. **Limit API token scope** to required permissions
3. **Rotate API tokens** regularly
4. **Store credentials securely** in n8n
5. **Monitor system logs** for suspicious activity
6. **Enable MFA** for admin accounts

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests (`npm test`)
5. Submit a pull request

## Support

- **Documentation**: See this README and inline code comments
- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-okta/issues)
- **Okta API Docs**: [developer.okta.com](https://developer.okta.com/docs/reference/)

## Acknowledgments

- [Okta](https://www.okta.com/) for their comprehensive API
- [n8n](https://n8n.io/) for the workflow automation platform
- The n8n community for inspiration and support
