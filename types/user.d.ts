// types/user.d.ts
export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  preferences?: {
    favoriteScents?: string[];
    preferredConcentration?: string;
    scentPreferences?: object;
  };
  shippingAddresses: Address[];
  billingAddresses: Address[];
  orderHistory: Order[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface Address {
  id: string;
  customerId: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface UserPreferences {
  favoriteScents: string[];
  preferredConcentration: string;
  scentProfiles: object;
}