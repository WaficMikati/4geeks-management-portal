import { API_URL } from '../config'

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
      const error = await response.json()
      return { error: error.message }
    }
    
    return { success: true }
  } catch (error) {
    return { error: 'Failed to create user' }
  }
}

export async function getUsers() {
  try {
    const response = await fetch(`${API_URL}/api/users/`)
    if (!response.ok) {
      throw new Response('Failed to fetch data', { status: response.status })
    }
    return response.json()
  } catch (error) {
    if (error instanceof Response) throw error
    throw new Response('Cannot connect to API', { status: 503 })
  }
}