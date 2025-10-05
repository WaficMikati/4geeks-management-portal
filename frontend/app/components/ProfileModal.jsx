import { Link } from 'react-router'

export function ProfileModal({ user, orders, onClose, onCreateOrder }) {
  if (!user) return null

  const totalSpent = orders.reduce((sum, order) => sum + order.amount, 0)
  const totalOrders = orders.length
  const mostRecentOrder = orders.length > 0 ? orders[0] : null

  return (
    <>
      <div
        className='modal show d-block'
        tabIndex='-1'
      >
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content'>
            <div className='modal-header border-0'>
              <h1 className='modal-title fs-5'>User Profile</h1>
              <button
                type='button'
                className='btn-close'
                onClick={onClose}
                aria-label='Close'
              />
            </div>
            <div className='modal-body'>
              <div className='row'>
                <div className='col-md-4 text-center mb-4 mb-md-0'>
                  <img
                    src='https://placehold.co/150x150'
                    alt='User avatar'
                    className='img-fluid rounded-circle mb-3'
                  />
                  <h4>{user.name}</h4>
                  <p className='text-muted small'>{user.email}</p>
                  <hr />
                  <div className='text-start'>
                    <p className='mb-2 small'>
                      <strong>User ID:</strong> {user.id}
                    </p>
                    <p className='mb-0 small'>
                      <strong>Member Since:</strong>{' '}
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className='col-md-8'>
                  <div className='card mb-3'>
                    <div className='card-header bg-primary text-white'>
                      <h6 className='m-0'>Statistics</h6>
                    </div>
                    <div className='card-body'>
                      <div className='row text-center'>
                        <div className='col-6'>
                          <h4 className='text-primary mb-0'>{totalOrders}</h4>
                          <small className='text-muted'>Total Orders</small>
                        </div>
                        <div className='col-6'>
                          <h4 className='text-success mb-0'>
                            ${totalSpent.toFixed(2)}
                          </h4>
                          <small className='text-muted'>Total Spent</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='card'>
                    <div className='card-header bg-success text-white'>
                      <h6 className='m-0'>Most Recent Order</h6>
                    </div>
                    <div className='card-body'>
                      {!mostRecentOrder ? (
                        <p className='text-muted text-center my-3 mb-0'>
                          No orders yet
                        </p>
                      ) : (
                        <>
                          <table className='table table-sm table-borderless mb-0'>
                            <tbody>
                              <tr>
                                <td>
                                  <strong>Order ID:</strong>
                                </td>
                                <td>#{mostRecentOrder.id}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Product:</strong>
                                </td>
                                <td>{mostRecentOrder.product_name}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Quantity:</strong>
                                </td>
                                <td>{mostRecentOrder.quantity}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Amount:</strong>
                                </td>
                                <td>${mostRecentOrder.amount.toFixed(2)}</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Date:</strong>
                                </td>
                                <td>
                                  {new Date(
                                    mostRecentOrder.created_at
                                  ).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: '2-digit',
                                    year: 'numeric'
                                  })}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          {totalOrders > 1 && (
                            <div className='text-center mt-3'>
                              <Link
                                to={`/users/${user.id}/orders`}
                                className='btn btn-sm btn-outline-primary'
                                onClick={onClose}
                              >
                                Show All {totalOrders} Orders
                              </Link>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer border-0'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={onClose}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-success'
                onClick={() => onCreateOrder(user)}
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className='modal-backdrop show'
        onClick={onClose}
      />
    </>
  )
}
