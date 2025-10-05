import { useLoaderData } from 'react-router'
import { AddUserModal } from '../components/AddUserModal'
import { UserEntry } from '../components/ItemEntry'
import { getUsers, addUser } from '../utils/apiCalls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '../utils/faIcons'

export { getUsers as loader }
export { addUser as action }

export default function Users() {
  const users = useLoaderData()

  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <div className='container py-3 flex-shrink-0'>
        <h1 className='m-0 text-center display-5'>Users</h1>
      </div>

      <div className='container flex-shrink-0 px-3 mb-3'>
        <div className='input-group flex-nowrap'>
          <input
            className='form-control p-3 fs-5'
            type='text'
            placeholder='Type to search users'
          />
          <AddUserModal>
            <FontAwesomeIcon icon={faPlus} />
          </AddUserModal>
        </div>
      </div>

      <div className='flex-grow-1 overflow-auto'>
        <div className='container h-100'>
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
              {users.data.map(({ name, email, id, created_at }) => (
                <UserEntry
                  key={id}
                  id={id}
                  name={name}
                  email={email}
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
