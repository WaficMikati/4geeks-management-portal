import { Link, useLoaderData } from 'react-router'
import { SearchBar } from '../components/SearchBar'
import { PageHeader } from '../components/PageHeader'
import { getOrders } from '../utils/apiCalls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '../utils/faIcons'
import { useState, useMemo } from 'react'

export { getOrders as loader }

export default function Orders() {
  const orders = useLoaderData()
  const [searchTerm, setSearchTerm] = useState('')

  const groupedOrders = useMemo(() => {
    const groups = {}

    orders.data.forEach(order => {
      const userId = order.user.id

      if (!groups[userId]) {
        groups[userId] = {
          id: userId,
          user: order.user,
          products: [],
          totalAmount: 0,
          latestDate: order.created_at
        }
      }

      groups[userId].products.push({
        name: order.product.name,
        price: order.product.price
      })
      groups[userId].totalAmount += order.amount

      if (new Date(order.created_at) > new Date(groups[userId].latestDate)) {
        groups[userId].latestDate = order.created_at
      }
    })

    return Object.values(groups)
  }, [orders.data])

  const filteredOrders = groupedOrders.filter(
    group =>
      group.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.id.toString().includes(searchTerm) ||
      group.products.some(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  )

  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <PageHeader
        title='Orders'
        data={orders.data}
        filename='orders'
      />

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder='Type to search orders'
      >
        <Link
          to='/orders/new'
          className='btn btn-success align-content-center'
        >
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </SearchBar>

      <div className='flex-grow-1 overflow-auto'>
        <div className='container h-100'>
          <table className='table table-striped table-hover text-center mb-0 table-borderless'>
            <thead className='table sticky-top z-2'>
              <tr>
                <th>Photo</th>
                <th className='text-start'>User ID#</th>
                <th className='text-start'>Name</th>
                <th className='text-start'>Products</th>
                <th className='text-start'>Prices</th>
                <th>Total Amount</th>
                <th>Latest Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(group => {
                const formattedDate = new Date(
                  group.latestDate
                ).toLocaleDateString('en-US', {
                  month: 'long',
                  day: '2-digit',
                  year: 'numeric'
                })

                return (
                  <tr
                    className='align-middle'
                    key={group.id}
                  >
                    <td>
                      <img
                        src='https://placehold.co/75x75'
                        alt='...'
                        className='img-fluid rounded-circle my-1'
                      />
                    </td>
                    <td className='text-start'>{group.id}</td>
                    <td className='text-start'>{group.user.name}</td>
                    <td className='text-start py-3'>
                      {group.products.map((product, idx) => (
                        <div key={idx}>{product.name}</div>
                      ))}
                    </td>
                    <td className='text-start'>
                      {group.products.map((product, idx) => (
                        <div key={idx}>${product.price.toFixed(2)}</div>
                      ))}
                    </td>
                    <td>${group.totalAmount.toFixed(2)}</td>
                    <td>{formattedDate}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
