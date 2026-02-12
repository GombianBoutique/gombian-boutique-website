// utils/formatting.js
export const formatCurrency = (amount, currency = 'ZAR') => {
  // Convert amount from cents to full currency units
  const value = amount / 100
  
  // Format based on currency
  const formatter = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  
  return formatter.format(value)
}

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-ZA', options)
}

export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const truncate = (str, maxLength = 100) => {
  if (!str || str.length <= maxLength) return str
  return str.substring(0, maxLength) + '...'
}