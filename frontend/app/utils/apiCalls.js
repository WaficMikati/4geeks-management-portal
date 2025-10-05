import { API_URL } from '../config'

export async function getUsers() {
  try {
    const response = await fetch(`${API_URL}/api/users/`)
    if (!response.ok) {
      throw new Response('Failed to load users. Please try again.', { 
        status: response.status 
      })
    }
    return response.json()
  } catch (error) {
    if (error instanceof Response) throw error
    throw new Response('Cannot connect to server. Please check your connection.', { 
      status: 503 
    })
  }
}

export async function addUser({ request }) {
  const formData = await request.formData()
  const data = {
    name: formData.get('name'),
    email: formData.get('email')
  }
  
  try {
    const response = await fetch(`${API_URL}/api/users/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      return { error: errorData.message || 'Failed to create user' }
    }
    
    return { success: true }
  } catch (error) {
    return { error: 'Cannot connect to server. Please try again.' }
  }
}

export async function getUserOrders(userId) {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}/orders`)
    if (!response.ok) {
      throw new Response('Failed to load user orders. Please try again.', { 
        status: response.status 
      })
    }
    return response.json()
  } catch (error) {
    if (error instanceof Response) throw error
    throw new Response('Cannot connect to server. Please check your connection.', { 
      status: 503 
    })
  }
}

export async function getOrders() {
  try {
    const response = await fetch(`${API_URL}/api/orders/`)
    if (!response.ok) {
      throw new Response('Failed to load orders. Please try again.', { 
        status: response.status 
      })
    }
    return response.json()
  } catch (error) {
    if (error instanceof Response) throw error
    throw new Response('Cannot connect to server. Please check your connection.', { 
      status: 503 
    })
  }
}

export async function addOrder({ request }) {
  const formData = await request.formData()
  const data = {
    user_id: formData.get('user_id'),
    product_name: formData.get('product_name'),
    amount: formData.get('amount')
  }
  
  try {
    const response = await fetch(`${API_URL}/api/orders/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      return { error: errorData.message || 'Failed to create order' }
    }
    
    return { success: true }
  } catch (error) {
    return { error: 'Cannot connect to server. Please try again.' }
  }
}

export async function getDashboard() {
  try {
    const response = await fetch(`${API_URL}/api/`)
    if (!response.ok) {
      throw new Response('Failed to load dashboard. Please try again.', { 
        status: response.status 
      })
    }
    return response.json()
  } catch (error) {
    if (error instanceof Response) throw error
    throw new Response('Cannot connect to server. Please check your connection.', { 
      status: 503 
    })
  }
}