export function ProductSelection({
  products,
  selectedProducts,
  onToggleProduct,
  isProductSelected,
  onNext,
  searchTerm,
  onSearchChange
}) {
  const totalAmount = selectedProducts.reduce(
    (sum, product) => sum + product.price,
    0
  )

  return (
    <>
      <div className='container flex-shrink-0 px-3 mb-3'>
        <div className='d-flex flex-column gap-2'>
          {selectedProducts.length > 0 && (
            <div className='bg-body-secondary p-3 rounded'>
              <div className='d-flex justify-content-between align-items-center mb-2'>
                <h5 className='m-0'>
                  Selected Products ({selectedProducts.length})
                </h5>
                <span className='fw-bold'>${totalAmount.toFixed(2)}</span>
              </div>
              <div className='d-flex flex-wrap gap-2'>
                {selectedProducts.map(product => (
                  <span
                    key={product.id}
                    className='badge bg-success fs-6 p-2'
                    style={{ cursor: 'pointer' }}
                    onClick={() => onToggleProduct(product)}
                  >
                    {product.name} - ${product.price.toFixed(2)} ×
                  </span>
                ))}
              </div>
            </div>
          )}
          <button
            className={`btn btn-${
              selectedProducts.length > 0 ? 'success' : 'secondary disabled'
            } p-3 fs-5`}
            onClick={onNext}
            disabled={selectedProducts.length === 0}
          >
            {selectedProducts.length > 0
              ? 'Review order summary'
              : 'Please select at least one product'}
          </button>
          <div className='input-group flex-nowrap'>
            <input
              className='form-control p-3 fs-5 bg-body'
              type='text'
              placeholder='Type to search products'
              value={searchTerm}
              onChange={e => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className='flex-grow-1 overflow-auto'>
        <div className='container h-100'>
          <table className='table table-borderless table-hover mb-0 fs-5'>
            <thead className='sticky-top table'>
              <tr>
                <th>ID#</th>
                <th>Product Name</th>
                <th>Price</th>
                <th className='text-center'>Selected</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr
                  onClick={() => onToggleProduct(product)}
                  className={`user-select-none ${
                    isProductSelected(product) ? 'table-active' : ''
                  }`}
                  style={{ cursor: 'pointer' }}
                  key={product.id}
                >
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td className='text-center'>
                    {isProductSelected(product) && (
                      <span className='badge bg-success'>✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
