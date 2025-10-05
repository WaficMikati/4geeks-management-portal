import { Form, Link, useLoaderData, useActionData } from 'react-router'
import { getUsers, addUser } from '../utils/apiCalls'
import { faPlus } from '../utils/faIcons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AddUserModal } from '../components/AddUserModal'
import { useState, useEffect } from 'react'

export { getUsers as loader }
export { addUser as action }

export default function NewOrder() {
  const users = useLoaderData()
  const actionData = useActionData()
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    if (actionData) {
      setSelectedUser(null)
    }
  }, [actionData])

  function selectUser(user) {
    setSelectedUser(user)
  }

  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <div className='container py-3 flex-shrink-0'>
        <div className='d-flex justify-content-center align-items-center position-relative'>
          <Link
            className='btn btn-secondary position-absolute ms-1 start-0 h-100 align-content-center fs-5'
            to='/orders'
          >
            Back to Orders
          </Link>
          <h1 className='m-0 display-5'>New Order</h1>
        </div>
      </div>

      <div className='container flex-shrink-0 px-3 mb-3'>
        <div className='d-flex flex-column gap-2'>
          <button
            className={`btn btn-${
              selectedUser ? 'success' : 'secondary disabled'
            } p-3 fs-5`}
          >
            {selectedUser
              ? 'Proceed to product selection'
              : 'Please select or add user'}
          </button>
          <div className='input-group flex-nowrap'>
            <input
              className='form-control w-75 p-3 fs-5 bg-body'
              type='text'
              placeholder='Type to search users'
            />
            <AddUserModal form={true}>
              <FontAwesomeIcon icon={faPlus} />
            </AddUserModal>
          </div>
        </div>
      </div>

      <div className='flex-grow-1 overflow-auto'>
        <div className='container h-100'>
          <table className='table table-borderless table-hover mb-0 fs-5'>
            <thead className='sticky-top table'>
              <tr>
                <th>ID#</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.data.map(user => (
                <tr
                  onClick={() => selectUser(user)}
                  className={`user-select-none ${
                    user === selectedUser ? 'table-active' : ''
                  }`}
                  style={{ cursor: 'pointer' }}
                  key={user.id}
                >
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
