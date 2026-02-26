// server/utils/user-store.ts
/**
 * Shared User Store for Mock Users
 * This provides a single source of truth for user data across all API endpoints
 */

import { hashPassword } from './password-utils'

export interface User {
  id: string
  email: string
  passwordHash: string
  firstName: string
  lastName: string
  phone?: string
  dateOfBirth?: string
  preferences?: {
    favoriteScents?: string[]
    preferredConcentration?: string
    scentPreferences?: {
      fragranceFamilies?: string[]
      genderCategories?: string[]
      scentNotes?: string[]
      seasons?: string[]
    }
  }
  shippingAddresses?: any[]
  billingAddresses?: any[]
  orderHistory?: string[]
  createdAt: string
  updatedAt: string
  isActive: boolean
}

// Global user store - shared across all API endpoints
const users: User[] = []
let isInitialized = false

// Mock user data
const mockUsersData = [
  {
    id: 'mock-user-001',
    email: 'customer@example.com',
    password: 'Test1234!',
    firstName: 'Sarah',
    lastName: 'Johnson',
    phone: '+27 82 123 4567',
    dateOfBirth: '1990-05-15',
    preferences: {
      preferredConcentration: 'edp',
      scentPreferences: {
        fragranceFamilies: ['floral', 'fresh'],
        genderCategories: ['female'],
        scentNotes: ['jasmine', 'rose', 'bergamot'],
        seasons: ['spring', 'summer']
      }
    },
    shippingAddresses: [
      {
        id: 'addr-001',
        firstName: 'Sarah',
        lastName: 'Johnson',
        addressLine1: '123 Rose Street',
        addressLine2: 'Apartment 4B',
        city: 'Centurion',
        state: 'Gauteng',
        postalCode: '0157',
        country: 'South Africa',
        phone: '+27 82 123 4567',
        isDefault: true
      }
    ],
    billingAddresses: [
      {
        id: 'addr-002',
        firstName: 'Sarah',
        lastName: 'Johnson',
        addressLine1: '123 Rose Street',
        addressLine2: 'Apartment 4B',
        city: 'Centurion',
        state: 'Gauteng',
        postalCode: '0157',
        country: 'South Africa',
        isDefault: true
      }
    ],
    orderHistory: [],
    createdAt: new Date('2026-01-01').toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: 'mock-user-002',
    email: 'premium@example.com',
    password: 'Premium123!',
    firstName: 'Michael',
    lastName: 'Chen',
    phone: '+27 71 987 6543',
    dateOfBirth: '1985-11-28',
    preferences: {
      preferredConcentration: 'parfum',
      scentPreferences: {
        fragranceFamilies: ['woody', 'oriental'],
        genderCategories: ['male', 'unisex'],
        scentNotes: ['sandalwood', 'amber', 'vetiver'],
        seasons: ['fall', 'winter']
      }
    },
    shippingAddresses: [
      {
        id: 'addr-003',
        firstName: 'Michael',
        lastName: 'Chen',
        addressLine1: '456 Oak Avenue',
        city: 'Sandton',
        state: 'Gauteng',
        postalCode: '2196',
        country: 'South Africa',
        phone: '+27 71 987 6543',
        isDefault: true
      },
      {
        id: 'addr-004',
        firstName: 'Michael',
        lastName: 'Chen',
        addressLine1: '789 Business Park',
        addressLine2: 'Suite 200',
        city: 'Midrand',
        state: 'Gauteng',
        postalCode: '1685',
        country: 'South Africa',
        phone: '+27 71 987 6543',
        isDefault: false
      }
    ],
    billingAddresses: [
      {
        id: 'addr-005',
        firstName: 'Michael',
        lastName: 'Chen',
        addressLine1: '456 Oak Avenue',
        city: 'Sandton',
        state: 'Gauteng',
        postalCode: '2196',
        country: 'South Africa',
        isDefault: true
      }
    ],
    orderHistory: [],
    createdAt: new Date('2026-01-05').toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true
  }
]

/**
 * Initialize mock users (call once on server start)
 */
export async function initializeUserStore(): Promise<void> {
  if (isInitialized) {
    console.log('[User Store] Already initialized, skipping...')
    return
  }

  console.log('[User Store] Initializing mock test users...')

  for (const userData of mockUsersData) {
    const { password, ...userWithoutPassword } = userData
    const passwordHash = await hashPassword(password)

    users.push({
      ...userWithoutPassword,
      passwordHash
    })

    console.log(`[User Store] Created test user: ${userData.email}`)
  }

  isInitialized = true
  console.log(`[User Store] Successfully initialized ${mockUsersData.length} test users`)
  console.log('[User Store] ============================================================')
  console.log('[User Store] TEST CREDENTIALS:')
  console.log('[User Store]   User 1: customer@example.com / Test1234!')
  console.log('[User Store]   User 2: premium@example.com / Premium123!')
  console.log('[User Store] ============================================================')
}

/**
 * Get all users
 */
export function getUsers(): User[] {
  if (!isInitialized) {
    console.warn('[User Store] Accessed before initialization!')
  }
  return users
}

/**
 * Find user by email
 */
export function findUserByEmail(email: string): User | undefined {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase())
}

/**
 * Find user by ID
 */
export function findUserById(id: string): User | undefined {
  return users.find(u => u.id === id)
}

/**
 * Add a new user
 */
export function addUser(user: User): void {
  users.push(user)
}

/**
 * Update user
 */
export function updateUser(id: string, updates: Partial<User>): boolean {
  const index = users.findIndex(u => u.id === id)
  if (index === -1) return false

  users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() }
  return true
}
