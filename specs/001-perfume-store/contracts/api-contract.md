# API Contract: Perfume Store Website

## Overview
This document defines the API contracts for the perfume store website. Since this is primarily a static site with showcase functionality, the "API" consists of data structures used by the frontend components.

## Product Data Contract

### GET /api/products
Retrieve a list of all perfume products

**Response Body:**
```json
{
  "products": [
    {
      "id": "string (required)",
      "name": "string (required, max 100 chars)",
      "description": "string (required)",
      "price": "number (required, positive)",
      "volume": "string (required, e.g. '50ml')",
      "gender": "string ('unisex'|'men'|'women'|'n/a', default: 'unisex')",
      "fragranceFamily": "string (e.g. 'floral', 'woody', 'citrus')",
      "season": "string ('spring'|'summer'|'fall'|'winter'|'year-round')",
      "longevity": "string (e.g. '8-12 hours')",
      "concentration": "string ('parfum'|'EDP'|'EDT'|'cologne')",
      "scentNotes": {
        "top": "string[] (required, at least 1)",
        "middle": "string[] (required, at least 1)",
        "base": "string[] (required, at least 1)"
      },
      "ingredients": "string[] (required)",
      "images": "string[] (required, at least 1)",
      "category": "string ('premium'|'signature'|'limited-edition'|'best-seller')",
      "inStock": "boolean (default: true)",
      "createdAt": "ISO date string",
      "updatedAt": "ISO date string"
    }
  ]
}
```

### GET /api/products/{id}
Retrieve a specific perfume product by ID

**Path Parameters:**
- `id`: string, required

**Response Body:**
```json
{
  "product": {
    // Same structure as individual product in GET /api/products
  }
}
```

### GET /api/navigation
Retrieve navigation menu items

**Response Body:**
```json
{
  "menu": [
    {
      "id": "string (required)",
      "title": "string (required, max 50 chars)",
      "path": "string (required, valid URL path)",
      "priority": "number (required, positive)",
      "isVisible": "boolean (default: true)",
      "icon": "string (optional)"
    }
  ]
}
```

### GET /api/contact
Retrieve contact information

**Response Body:**
```json
{
  "contact": {
    "phone": "string (international format)",
    "email": "string (valid email)",
    "address": "string",
    "city": "string",
    "country": "string",
    "hours": {
      "monday": "string (HH:MM-HH:MM format)",
      "tuesday": "string (HH:MM-HH:MM format)",
      "wednesday": "string (HH:MM-HH:MM format)",
      "thursday": "string (HH:MM-HH:MM format)",
      "friday": "string (HH:MM-HH:MM format)",
      "saturday": "string (HH:MM-HH:MM format)",
      "sunday": "string (HH:MM-HH:MM format)"
    }
  }
}
```

### GET /api/policies
Retrieve business policies

**Response Body:**
```json
{
  "policies": [
    {
      "id": "string ('shipping'|'returns'|'privacy'|'terms', required)",
      "title": "string (required, max 100 chars)",
      "content": "string (required, min 10 chars)",
      "lastUpdated": "ISO date string",
      "isActive": "boolean (default: true)"
    }
  ]
}
```

## Error Response Contract

All API endpoints follow this error response structure:

```json
{
  "error": {
    "code": "string (e.g. 'NOT_FOUND', 'VALIDATION_ERROR')",
    "message": "string (human-readable error message)",
    "details": "object (optional, specific error details)"
  }
}
```

## HTTP Status Codes

- `200 OK`: Successful request
- `400 Bad Request`: Invalid request parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error