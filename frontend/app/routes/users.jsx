import { useLoaderData, useNavigate } from 'react-router'
import { AddItemModal } from '../components/AddItemModal'
import { ProfileModal } from '../components/ProfileModal'
import { SearchBar } from '../components/SearchBar'
import { PageHeader } from '../components/PageHeader'
import { getUsers, addUser, getUserOrders } from '../utils/apiCalls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '../utils/faIcons'
import { useState } from 'react'

export { getUsers as loader }
export { addUser as action }

export default function Users() {
  const users = useLoaderData()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [userOrders, setUserOrders] = useState([])

  const filteredUsers = users.data.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toString().includes(searchTerm)
  )

  const userFields = [
    { name: 'name', placeholder: 'First Middle Last' },
    { name: 'email', placeholder: 'email@domain.com' }
  ]

  async function handleUserClick(user) {
    setSelectedUser(user)
    try {
      const data = await getUserOrders({ params: { userId: user.id } })
      setUserOrders(data.data.orders)
    } catch (error) {
      setUserOrders([])
    }
  }

  function handleCloseModal() {
    setSelectedUser(null)
    setUserOrders([])
  }

  function handleCreateOrder(user) {
    navigate('/orders/new', { state: { preselectedUser: user } })
  }

  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <PageHeader
        title='Users'
        data={users.data}
        filename='users'
      />

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder='Type to search users'
      >
        <AddItemModal
          title='Add New User'
          fields={userFields}
        >
          <FontAwesomeIcon icon={faPlus} />
        </AddItemModal>
      </SearchBar>

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
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(({ name, email, id, created_at }) => {
                const formattedDate = new Date(created_at).toLocaleDateString(
                  'en-US',
                  {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric'
                  }
                )

                return (
                  <tr
                    key={id}
                    onClick={() =>
                      handleUserClick({ name, email, id, created_at })
                    }
                    style={{ cursor: 'pointer' }}
                    className='align-middle'
                  >
                    <td>
                      <img
                        src='https://placehold.co/75x75'
                        alt='...'
                        className='img-fluid rounded-circle my-1'
                      />
                    </td>
                    <td className='text-start'>{id}</td>
                    <td className='text-start'>{name}</td>
                    <td className='text-start'>
                      <a
                        href={`mailto:${email}`}
                        onClick={e => e.stopPropagation()}
                      >
                        {email}
                      </a>
                    </td>
                    <td>{formattedDate}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <ProfileModal
          user={selectedUser}
          orders={userOrders}
          onClose={handleCloseModal}
          onCreateOrder={handleCreateOrder}
        />
      )}
    </div>
  )
}
