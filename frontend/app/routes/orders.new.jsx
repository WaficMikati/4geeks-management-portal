import { Link } from 'react-router'

export default function NewOrder() {
  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <div className='container py-3 flex-shrink-0'>
        <div className='d-flex justify-content-center align-items-center position-relative'>
          <Link
            className='btn btn-primary position-absolute start-0'
            to='/orders'
          >
            Back to Orders
          </Link>
          <h1 className='m-0'>New Order</h1>
        </div>
      </div>
    </div>
    // <form>
    //   <div className='card-header'>
    //     <h1 className='card-title'>New Order</h1>
    //   </div>
    //   <div className='card-body'></div>
    //   <div className='card-footer d-flex justify-content-end gap-2'>
    //     <Link
    //       className='btn btn-secondary'
    //       to='/orders'
    //     >
    //       Cancel
    //     </Link>
    //     <button className='btn btn-success'>Confirm</button>
    //   </div>
    // </form>
  )
}
