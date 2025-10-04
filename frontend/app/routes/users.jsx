import { useLoaderData } from 'react-router'
import { FormModal } from '../components/FormModal'
import { API_URL } from '../config'
import { UserCard } from '../components/UserCard'

export async function loader() {
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

export default function Users() {
  const users = useLoaderData()
  const formFields = [
    { name: 'name', placeholder: 'First Middle Last' },
    { name: 'email', placeholder: 'email@domain.com' }
  ]

  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <div className='container py-3 flex-shrink-0'>
        <div className='d-flex justify-content-center align-items-center position-relative'>
          <FormModal
            type='user'
            formFields={formFields}
          />
          <h1 className='m-0'>Users</h1>
        </div>
      </div>

      <div className='flex-grow-1 overflow-auto'>
        <table className='container table text-center'>
          <thead>
            <tr>
              <th scope='col'>Photo</th>
              <th
                scope='col'
                className='text-start'
              >
                ID#
              </th>
              <th
                scope='col'
                className='text-start'
              >
                Name
              </th>
              <th
                scope='col'
                className='text-start'
              >
                Email
              </th>
              <th scope='col'>Date Created</th>
              <th scope='col'>Orders</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map(({ name, email, id, created_at }, i) => (
              <UserCard
                key={i}
                name={name}
                email={email}
                id={id}
                createdAt={created_at}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
