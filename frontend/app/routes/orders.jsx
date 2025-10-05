import { Link, useLoaderData } from 'react-router'
import { UserEntry } from '../components/ItemEntry'
import { getOrders, addOrder } from '../utils/apiCalls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '../utils/faIcons'

export { getOrders as loader }
export { addOrder as action }

export default function Users() {
  const orders = useLoaderData()

  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <div className='container py-3 flex-shrink-0'>
        <h1 className='m-0 text-center display-5'>Orders</h1>
      </div>

      <div className='container flex-shrink-0 px-3 mb-3'>
        <div className='input-group flex-nowrap'>
          <input
            className='form-control p-3 fs-5'
            type='text'
            placeholder='Type to search orders'
          />
          <Link
            to='/orders/new'
            className='btn btn-success align-content-center'
          >
            <FontAwesomeIcon icon={faPlus} />
          </Link>
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
                <th className='text-start'>Amount</th>
                <th>Date Created</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {orders.data.map(({ product_name, amount, id, created_at }) => (
                <UserEntry
                  key={id}
                  id={id}
                  name={product_name}
                  amount={amount}
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
