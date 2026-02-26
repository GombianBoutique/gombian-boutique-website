// server/utils/mock-users.ts
/**
 * Mock Users for Testing
 * 
 * This file creates 2 mock customer accounts for testing login, user sessions,
 * and account features. These users will be removed when integrating with the
 * production database.
 * 
 * ============================================================================
 * TEST CREDENTIALS
 * ============================================================================
 * 
 * User 1 - Standard Customer:
 *   Email: customer@example.com
 *   Password: Test1234!
 *   Name: Sarah Johnson
 *   
 * User 2 - Premium Customer:
 *   Email: premium@example.com
 *   Password: Premium123!
 *   Name: Michael Chen
 * 
 * ============================================================================
 */

import { hashPassword } from './password-utils'

export interface MockUser {
  id: string
  email: string
  passwordHash: string
  password: string // Plain text for testing documentation
  firstName: string
  lastName: string
  phone: string
  dateOfBirth: string
  preferences: {
    favoriteScents?: string[]
    preferredConcentration?: string
    scentPreferences?: {
      fragranceFamilies?: string[]
      genderCategories?: string[]
      scentNotes?: string[]
      seasons?: string[]
    }
  }
  shippingAddresses: Array<{
    id: string
    firstName: string
    lastName: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
    phone: string
    isDefault: boolean
  }>
  billingAddresses: Array<{
    id: string
    firstName: string
    lastName: string
    addressLine1: string
    city: string
    state: string
    postalCode: string
    country: string
    isDefault: boolean
  }>
  orderHistory: string[]
  createdAt: string
  updatedAt: string
  isActive: boolean
}

// Mock user data with plain text passwords for testing documentation
export const mockUsersData: Array<Omit<MockUser, 'passwordHash'> & { password: string }> = [
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
 * Initialize mock users in the user store
 * Call this function when the server starts to populate test users
 */
export async function initializeMockUsers(users: any[]): Promise<void> {
  // Check if mock users already exist to avoid duplicates
  const existingMockUser = users.find((u: any) => u.id === 'mock-user-001')
  
  if (existingMockUser) {
    console.log('[Mock Users] Mock users already initialized, skipping...')
    return
  }

  console.log('[Mock Users] Initializing mock test users...')

  // Create mock users with hashed passwords
  for (const userData of mockUsersData) {
    const { password, ...userWithoutPassword } = userData
    const passwordHash = await hashPassword(password)
    
    users.push({
      ...userWithoutPassword,
      passwordHash
    })
    
    console.log(`[Mock Users] Created test user: ${userData.email}`)
  }

  console.log(`[Mock Users] Successfully initialized ${mockUsersData.length} test users`)
  console.log('[Mock Users] ============================================================')
  console.log('[Mock Users] TEST CREDENTIALS:')
  console.log('[Mock Users]   User 1: customer@example.com / Test1234!')
  console.log('[Mock Users]   User 2: premium@example.com / Premium123!')
  console.log('[Mock Users] ============================================================')
}
