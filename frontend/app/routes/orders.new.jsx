import {
  Link,
  useLoaderData,
  useActionData,
  useNavigate,
  useLocation
} from 'react-router'
import { getUsers, getProducts, addUser } from '../utils/apiCalls'
import { API_URL } from '../config'
import { UserSelection } from '../components/UserSelection'
import { ProductSelection } from '../components/ProductSelection'
import { Summary } from '../components/Summary'
import { useState, useEffect } from 'react'

export async function loader() {
  const [users, products] = await Promise.all([getUsers(), getProducts()])
  return { users, products }
}

export { addUser as action }

export default function NewOrder() {
  const { users, products } = useLoaderData()
  const actionData = useActionData()
  const navigate = useNavigate()
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [userSearchTerm, setUserSearchTerm] = useState('')
  const [productSearchTerm, setProductSearchTerm] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle preselected user from navigation state
  useEffect(() => {
    if (location.state?.preselectedUser) {
      setSelectedUser(location.state.preselectedUser)
      setCurrentPage(2)
    }
  }, [location.state])

  useEffect(() => {
    if (actionData && !actionData.error && currentPage === 1) {
      setSelectedUser(null)
    }
  }, [actionData, currentPage])

  function toggleProduct(product) {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev.filter(p => p.id !== product.id)
      }
      return [...prev, product]
    })
  }

  function isProductSelected(product) {
    return selectedProducts.some(p => p.id === product.id)
  }

  function goToNextPage() {
    if (currentPage === 1 && selectedUser) {
      setCurrentPage(2)
    } else if (currentPage === 2 && selectedProducts.length > 0) {
      setCurrentPage(3)
    }
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  async function handleSubmit() {
    setIsSubmitting(true)

    try {
      for (const product of selectedProducts) {
        const response = await fetch(`${API_URL}/api/orders/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: selectedUser.id,
            product_id: product.id,
            amount: product.price,
            quantity: 1
          })
        })

        if (!response.ok) {
          const errorData = await response.json()
          alert(
            `Error creating order for ${product.name}: ${
              errorData.message || 'Failed to create order'
            }`
          )
          setIsSubmitting(false)
          return
        }
      }

      navigate('/orders')
    } catch (error) {
      alert('Failed to create orders. Please try again.')
      setIsSubmitting(false)
    }
  }

  const filteredUsers = users.data.filter(
    user =>
      user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.id.toString().includes(userSearchTerm)
  )

  const filteredProducts = products.data.filter(product =>
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase())
  )

  const pageTitle =
    currentPage === 1
      ? 'Select User'
      : currentPage === 2
      ? 'Select Products'
      : 'Summary'

  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <div className='container py-3 flex-shrink-0'>
        <div className='d-flex justify-content-center align-items-center position-relative'>
          <button
            className='btn btn-secondary position-absolute ms-1 start-0 h-100 align-content-center fs-5'
            onClick={
              currentPage === 1 ? () => navigate('/orders') : goToPreviousPage
            }
          >
            {currentPage === 1 ? 'Back to Orders' : 'Previous'}
          </button>
          <h1 className='m-0 display-5'>New Order - {pageTitle}</h1>
        </div>
      </div>

      {currentPage === 1 && (
        <UserSelection
          users={filteredUsers}
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
          onNext={goToNextPage}
          searchTerm={userSearchTerm}
          onSearchChange={setUserSearchTerm}
        />
      )}

      {currentPage === 2 && (
        <ProductSelection
          products={filteredProducts}
          selectedProducts={selectedProducts}
          onToggleProduct={toggleProduct}
          isProductSelected={isProductSelected}
          onNext={goToNextPage}
          searchTerm={productSearchTerm}
          onSearchChange={setProductSearchTerm}
        />
      )}

      {currentPage === 3 && (
        <Summary
          selectedUser={selectedUser}
          selectedProducts={selectedProducts}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}
