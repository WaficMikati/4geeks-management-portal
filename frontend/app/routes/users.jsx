import { useLoaderData } from 'react-router'
import { AddUserModal } from '../components/AddUserModal'
import { UserEntry } from '../components/UserEntry'
import { getUsers, addUser } from '../utils/apiCalls'

export { getUsers as loader }
export { addUser as action }

export default function Users() {
  const users = useLoaderData()

  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <div className='container py-3 flex-shrink-0'>
        <div className='d-flex justify-content-center align-items-center position-relative '>
          <h1 className='m-0'>Users</h1>
          <AddUserModal>Add User</AddUserModal>
        </div>
      </div>

      <div className='container-fluid container-lg flex-shrink-0 px-3'>
        <input
          className='form-control fs-5 p-3 mb-3 text-center'
          type='text'
          name='search'
          placeholder='Type to search for user'
        />
      </div>

      <div className='flex-grow-1 overflow-auto'>
        <div className='container-fluid container-lg h-100'>
          <table className='table table-striped table-hover text-center mb-0 table-borderless'>
            <thead className='table sticky-top z-2'>
              <tr>
                <th>Photo</th>
                <th className='text-start'>ID#</th>
                <th className='text-start'>Name</th>
                <th className='text-start'>Email</th>
                <th>Date Created</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {users.data.map(({ name, email, id, created_at }, i) => (
                <UserEntry
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
    </div>
  )
}
