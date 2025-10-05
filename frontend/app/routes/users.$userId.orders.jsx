import { Link, useLoaderData } from 'react-router'
import { SearchBar } from '../components/SearchBar'
import { PageHeader } from '../components/PageHeader'
import { getUserOrders } from '../utils/apiCalls'
import { useState } from 'react'

export { getUserOrders as loader }

export default function UserOrders() {
  const data = useLoaderData()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOrders = data.data.orders.filter(
    order =>
      order.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm) ||
      order.amount.toString().includes(searchTerm)
  )

  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <PageHeader title={`${data.data.user.name}'s Orders`}>
        <Link
          className='btn btn-secondary position-absolute ms-1 start-0 h-100 align-content-center fs-5'
          to='/users'
        >
          Back to Users
        </Link>
      </PageHeader>

      <div className='container flex-shrink-0 px-3 mb-3'>
        <div className='card bg-body-secondary'>
          <div className='card-body'>
            <div className='row'>
              <div className='col mb-2 mb-md-0'>
                <strong>ID:</strong> {data.data.user.id}
              </div>

              <div className='col'>
                <strong>Email:</strong> {data.data.user.email}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder='Type to search orders'
      />

      <div className='flex-grow-1 overflow-auto'>
        <div className='container h-100'>
          <table className='table table-striped table-hover text-center mb-0 table-borderless'>
            <thead className='table sticky-top z-2'>
              <tr>
                <th>Photo</th>
                <th className='text-start'>ID#</th>
                <th className='text-start'>Product</th>
                <th className='text-start'>Amount</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(
                ({ product_name, amount, id, created_at }) => {
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
                      <td className='text-start'>{product_name}</td>
                      <td className='text-start'>${amount.toFixed(2)}</td>
                      <td>{formattedDate}</td>
                    </tr>
                  )
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
