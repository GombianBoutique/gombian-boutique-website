# Mock Users for Testing

This directory contains mock user data for testing the Gombian Boutique authentication and account features.

## ⚠️ IMPORTANT

**These mock users are for TESTING ONLY and will be removed when integrating with the production database.**

---

## 📋 Test Credentials

### User 1 - Standard Customer

| Field | Value |
|-------|-------|
| **Email** | `customer@example.com` |
| **Password** | `Test1234!` |
| **Name** | Sarah Johnson |
| **Phone** | +27 82 123 4567 |
| **Date of Birth** | May 15, 1990 |

**Profile:**
- Prefers Eau de Parfum (EDP) concentration
- Favorite fragrance families: Floral, Fresh
- Favorite notes: Jasmine, Rose, Bergamot
- Preferred seasons: Spring, Summer

**Address:**
```
123 Rose Street, Apartment 4B
Centurion, Gauteng, 0157
South Africa
```

---

### User 2 - Premium Customer

| Field | Value |
|-------|-------|
| **Email** | `premium@example.com` |
| **Password** | `Premium123!` |
| **Name** | Michael Chen |
| **Phone** | +27 71 987 6543 |
| **Date of Birth** | November 28, 1985 |

**Profile:**
- Prefers Parfum concentration
- Favorite fragrance families: Woody, Oriental
- Favorite notes: Sandalwood, Amber, Vetiver
- Preferred seasons: Fall, Winter

**Addresses:**

*Primary (Default):*
```
456 Oak Avenue
Sandton, Gauteng, 2196
South Africa
```

*Secondary:*
```
789 Business Park, Suite 200
Midrand, Gauteng, 1685
South Africa
```

---

## 🧪 Testing Scenarios

### Login Testing
```
✅ Test successful login with both users
✅ Test failed login with wrong password
✅ Test failed login with wrong email
✅ Test session persistence
✅ Test multiple device sessions
```

### Account Features
```
✅ View and edit profile information
✅ Update scent preferences
✅ Manage shipping addresses
✅ Manage billing addresses
✅ View order history (when implemented)
```

### Checkout Testing
```
✅ Test checkout with saved addresses
✅ Test different payment methods
✅ Test order placement
✅ Test order tracking
```

### Account Management
```
✅ Test password reset flow
✅ Test account preferences
✅ Test wishlist functionality
✅ Test cart persistence
```

---

## 🔧 Implementation Details

### Files Modified
- `server/utils/mock-users.ts` - Mock user data and initialization
- `server/utils/password-utils.ts` - Password hashing utilities
- `server/api/auth/login.post.ts` - Integrated mock user initialization

### How It Works
1. When the server starts, `initializeMockUsers()` is called
2. Mock users are created with hashed passwords
3. Users are added to the in-memory user store
4. Duplicate initialization is prevented

### Password Security
- Passwords are hashed using SHA-256 with salt
- Plain text passwords are only in documentation for testing
- Hashed passwords match production hashing algorithm

---

## 🗑️ Removal Instructions

When ready to integrate with production database:

1. Remove mock user initialization from `server/api/auth/login.post.ts`:
   ```typescript
   // Remove these lines:
   import { initializeMockUsers } from '../../utils/mock-users'
   let mockUsersInitialized = false
   if (!mockUsersInitialized) {
     initializeMockUsers(users)
     mockUsersInitialized = true
   }
   ```

2. Delete mock user files:
   ```bash
   rm server/utils/mock-users.ts
   rm server/utils/password-utils.ts
   rm docs/MOCK_USERS.md
   ```

3. Connect to production database in auth endpoints

---

## 📝 Notes

- Mock users are stored in-memory (will be lost on server restart)
- Password requirements: 8+ chars, uppercase, lowercase, number
- Email validation is case-insensitive
- Accounts are marked as `isActive: true`
- Created timestamps: January 2026

---

**Last Updated:** 2026-02-21
**Version:** 1.0
**Status:** Testing Only - Remove Before Production
