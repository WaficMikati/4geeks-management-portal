import { useLoaderData } from 'react-router'
import { API_URL } from '../config'

export async function loader() {
  try {
    const response = await fetch(`${API_URL}/api/`)

    if (!response.ok) {
      throw new Response('Failed to fetch data', { status: response.status })
    }

    return response.json()
  } catch (error) {
    if (error instanceof Response) throw error
    throw new Response('Cannot connect to API', { status: 503 })
  }
}

export default function Dashboard() {
  const data = useLoaderData()

  return (
    <>
      <h1>Dashboard</h1>
      <p>{data.message}</p>
    </>
  )
}
