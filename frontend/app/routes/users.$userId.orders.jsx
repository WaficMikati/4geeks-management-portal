import { Link, useLoaderData, useParams } from 'react-router'
import { ItemEntry } from '../components/ItemEntry'
import { getUserOrders } from '../utils/apiCalls'
import { useState } from 'react'

export { getUserOrders as loader }

export default function UserOrders() {
  const data = useLoaderData()
  const { userId } = useParams()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOrders = data.data.orders.filter(
    order =>
      order.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm) ||
      order.amount.toString().includes(searchTerm)
  )

  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <div className='container py-3 flex-shrink-0'>
        <div className='d-flex justify-content-center align-items-center position-relative'>
          <Link
            className='btn btn-secondary position-absolute ms-1 start-0 h-100 align-content-center fs-5'
            to='/users'
          >
            Back to Users
          </Link>
          <h1 className='m-0 display-5'>{data.data.user.name}'s Orders</h1>
        </div>
      </div>

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

      <div className='container flex-shrink-0 px-3 mb-3'>
        <input
          className='form-control p-3 fs-5'
          type='text'
          placeholder='Type to search orders'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

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
                ({ product_name, amount, id, created_at }) => (
                  <ItemEntry
                    key={id}
                    id={id}
                    name={product_name}
                    amount={amount}
                    createdAt={created_at}
                    hideAction={true}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
