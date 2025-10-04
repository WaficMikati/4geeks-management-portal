import { Link } from 'react-router'

export default function Orders() {
  return (
    <div className='container-fluid'>
      <div className='d-flex justify-content-center align-items-center position-relative mb-2'>
        <Link
          className='btn btn-success position-absolute start-0'
          to='/createOrder'
        >
          Create Order
        </Link>
        <h1 className='m-0'>Orders</h1>
      </div>
    </div>
  )
}
