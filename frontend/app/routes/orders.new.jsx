import { Link } from 'react-router'

export default function NewOrder() {
  return (
    <form className='card'>
      <div className='card-header'>
        <h1 className='card-title'>New Order</h1>
      </div>
      <div className='card-body'></div>
      <div className='card-footer d-flex justify-content-end gap-2'>
        <Link
          className='btn btn-secondary'
          to='/orders'
        >
          Cancel
        </Link>
        <button className='btn btn-success'>Confirm</button>
      </div>
    </form>
  )
}
