import {
  Link,
  useLoaderData,
  useActionData,
  useNavigate,
  useLocation
} from 'react-router'
import { PageHeader } from '../components/PageHeader'
import { getUsers, getProducts, addUser } from '../utils/apiCalls'
import { API_URL } from '../config'
import { UserSelection } from '../components/UserSelection'
import { ProductSelection } from '../components/ProductSelection'
import { Summary } from '../components/Summary'
import { useReducer, useEffect } from 'react'

export async function loader() {
  const [users, products] = await Promise.all([getUsers(), getProducts()])
  return { users, products }
}

export { addUser as action }

const initialState = {
  currentPage: 1,
  selectedUser: null,
  selectedProducts: [],
  userSearchTerm: '',
  productSearchTerm: '',
  isSubmitting: false
}

function orderReducer(state, action) {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload }
    case 'SELECT_USER':
      return { ...state, selectedUser: action.payload }
    case 'TOGGLE_PRODUCT':
      const exists = state.selectedProducts.find(
        p => p.id === action.payload.id
      )
      return {
        ...state,
        selectedProducts: exists
          ? state.selectedProducts.filter(p => p.id !== action.payload.id)
          : [...state.selectedProducts, action.payload]
      }
    case 'SET_USER_SEARCH':
      return { ...state, userSearchTerm: action.payload }
    case 'SET_PRODUCT_SEARCH':
      return { ...state, productSearchTerm: action.payload }
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload }
    case 'RESET_USER':
      return { ...state, selectedUser: null }
    case 'PRESELECT_USER':
      return { ...state, selectedUser: action.payload, currentPage: 2 }
    default:
      return state
  }
}

export default function NewOrder() {
  const { users, products } = useLoaderData()
  const actionData = useActionData()
  const navigate = useNavigate()
  const location = useLocation()
  const [state, dispatch] = useReducer(orderReducer, initialState)

  useEffect(() => {
    if (location.state?.preselectedUser) {
      dispatch({
        type: 'PRESELECT_USER',
        payload: location.state.preselectedUser
      })
    }
  }, [location.state])

  useEffect(() => {
    if (actionData && !actionData.error && state.currentPage === 1) {
      dispatch({ type: 'RESET_USER' })
    }
  }, [actionData, state.currentPage])

  function isProductSelected(product) {
    return state.selectedProducts.some(p => p.id === product.id)
  }

  function goToNextPage() {
    if (state.currentPage === 1 && state.selectedUser) {
      dispatch({ type: 'SET_PAGE', payload: 2 })
    } else if (state.currentPage === 2 && state.selectedProducts.length > 0) {
      dispatch({ type: 'SET_PAGE', payload: 3 })
    }
  }

  function goToPreviousPage() {
    if (state.currentPage > 1) {
      dispatch({ type: 'SET_PAGE', payload: state.currentPage - 1 })
    }
  }

  async function handleSubmit() {
    dispatch({ type: 'SET_SUBMITTING', payload: true })

    try {
      for (const product of state.selectedProducts) {
        const response = await fetch(`${API_URL}/api/orders/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: state.selectedUser.id,
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
          dispatch({ type: 'SET_SUBMITTING', payload: false })
          return
        }
      }

      navigate('/orders')
    } catch (error) {
      alert('Failed to create orders. Please try again.')
      dispatch({ type: 'SET_SUBMITTING', payload: false })
    }
  }

  const filteredUsers = users.data.filter(
    user =>
      user.name.toLowerCase().includes(state.userSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(state.userSearchTerm.toLowerCase()) ||
      user.id.toString().includes(state.userSearchTerm)
  )

  const filteredProducts = products.data.filter(product =>
    product.name.toLowerCase().includes(state.productSearchTerm.toLowerCase())
  )

  const pageTitle =
    state.currentPage === 1
      ? 'Select User'
      : state.currentPage === 2
      ? 'Select Products'
      : 'Summary'

  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <PageHeader title={`New Order - ${pageTitle}`}>
        <button
          className='btn btn-secondary position-absolute ms-1 start-0 h-100 align-content-center fs-5'
          onClick={
            state.currentPage === 1
              ? () => navigate('/orders')
              : goToPreviousPage
          }
        >
          {state.currentPage === 1 ? 'Back to Orders' : 'Previous'}
        </button>
      </PageHeader>

      {state.currentPage === 1 && (
        <UserSelection
          users={filteredUsers}
          selectedUser={state.selectedUser}
          onSelectUser={user =>
            dispatch({ type: 'SELECT_USER', payload: user })
          }
          onNext={goToNextPage}
          searchTerm={state.userSearchTerm}
          onSearchChange={term =>
            dispatch({ type: 'SET_USER_SEARCH', payload: term })
          }
        />
      )}

      {state.currentPage === 2 && (
        <ProductSelection
          products={filteredProducts}
          selectedProducts={state.selectedProducts}
          onToggleProduct={product =>
            dispatch({ type: 'TOGGLE_PRODUCT', payload: product })
          }
          isProductSelected={isProductSelected}
          onNext={goToNextPage}
          searchTerm={state.productSearchTerm}
          onSearchChange={term =>
            dispatch({ type: 'SET_PRODUCT_SEARCH', payload: term })
          }
        />
      )}

      {state.currentPage === 3 && (
        <Summary
          selectedUser={state.selectedUser}
          selectedProducts={state.selectedProducts}
          onSubmit={handleSubmit}
          isSubmitting={state.isSubmitting}
        />
      )}
    </div>
  )
}
