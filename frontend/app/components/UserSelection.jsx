import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '../utils/faIcons'
import { AddItemModal } from './AddItemModal'

export function UserSelection({
  users,
  selectedUser,
  onSelectUser,
  onNext,
  searchTerm,
  onSearchChange
}) {
  const userFields = [
    { name: 'name', placeholder: 'First Middle Last' },
    { name: 'email', placeholder: 'email@domain.com' }
  ]

  return (
    <>
      <div className='container flex-shrink-0 px-3 mb-3'>
        <div className='d-flex flex-column gap-2'>
          <button
            className={`btn btn-${
              selectedUser ? 'success' : 'secondary disabled'
            } p-3 fs-5`}
            onClick={onNext}
            disabled={!selectedUser}
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
              value={searchTerm}
              onChange={e => onSearchChange(e.target.value)}
            />
            <AddItemModal
              title='Add New User'
              fields={userFields}
            >
              <FontAwesomeIcon icon={faPlus} />
            </AddItemModal>
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
              {users.map(user => (
                <tr
                  onClick={() => onSelectUser(user)}
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
    </>
  )
}
