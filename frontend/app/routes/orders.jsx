import { Link } from 'react-router'

export default function Orders() {
  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <div className='d-flex flex-column h-100 overflow-hidden'>
        <div className='container py-3 flex-shrink-0'>
          <div className='d-flex justify-content-center align-items-center position-relative'>
            <Link
              className='btn btn-success position-absolute start-0'
              to='/orders/new'
            >
              Create Order
            </Link>
            <h1 className='m-0'>Orders</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
