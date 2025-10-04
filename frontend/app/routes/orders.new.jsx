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

  function selectUser(e) {
    setSelectedUser(e)
  }

  return (
    <div className='d-flex flex-column h-100  overflow-hidden'>
      <div className='container py-3 flex-shrink-0'>
        <div className='d-flex justify-content-center align-items-center position-relative'>
          <Link
            className='btn btn-primary position-absolute start-0'
            to='/orders'
          >
            Back to Orders
          </Link>
          <h1 className='m-0'>New Order</h1>
        </div>
      </div>
      <div className='container flex-shrink-0 mb-2'>
        <div className='d-flex flex-column gap-2'>
          <button
            className={`btn btn-${
              selectedUser ? 'success' : 'secondary disabled'
            } p-3 fs-5 `}
          >
            {selectedUser
              ? 'Proceed to product selection'
              : 'Please select or add user'}
          </button>
          <div className='input-group flex-nowrap'>
            <input
              className='form-control w-75 p-3 fs-5'
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
          <div className='overflow-hidden'>
            <table className='table table-borderless table-hover mb-0 fs-5'>
              <thead className='sticky-top table'>
                <tr>
                  <th>ID#</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.data.map((e, i) => (
                  <tr
                    onClick={() => selectUser(e)}
                    className={`user-select-none ${
                      e === selectedUser ? 'table-active' : ''
                    }`}
                    style={{ cursor: 'pointer' }}
                    key={i}
                  >
                    <td>{e.id}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Form method='post'></Form>
    </div>
  )
}
