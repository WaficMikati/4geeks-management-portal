export function Summary({
  selectedUser,
  selectedProducts,
  onSubmit,
  isSubmitting
}) {
  const totalAmount = selectedProducts.reduce(
    (sum, product) => sum + product.price,
    0
  )

  return (
    <>
      <div className='container flex-shrink-0 px-3 mb-3'>
        <button
          className='btn btn-success p-3 fs-5 w-100'
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Submitting Orders...'
            : `Submit ${selectedProducts.length} Order${
                selectedProducts.length > 1 ? 's' : ''
              }`}
        </button>
      </div>

      <div className='flex-grow-1 overflow-auto'>
        <div className='container h-100'>
          <div className='card mb-4'>
            <div className='card-header bg-primary text-white'>
              <h4 className='m-0'>User Information</h4>
            </div>
            <div className='card-body'>
              <div className='row mb-2'>
                <div className='col-3 fw-bold'>ID:</div>
                <div className='col-9'>{selectedUser.id}</div>
              </div>
              <div className='row mb-2'>
                <div className='col-3 fw-bold'>Name:</div>
                <div className='col-9'>{selectedUser.name}</div>
              </div>
              <div className='row'>
                <div className='col-3 fw-bold'>Email:</div>
                <div className='col-9'>{selectedUser.email}</div>
              </div>
            </div>
          </div>

          <div className='card mb-4'>
            <div className='card-header bg-success text-white'>
              <h4 className='m-0'>Order Details</h4>
            </div>
            <div className='card-body'>
              <table className='table table-borderless mb-0'>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th className='text-end'>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.map(product => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td className='text-end'>${product.price.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className='border-top fw-bold fs-5'>
                    <td>Total Amount</td>
                    <td className='text-end'>${totalAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
