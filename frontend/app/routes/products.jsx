import { useLoaderData } from 'react-router'
import { AddProductModal } from '../components/AddProductModal'
import { getProducts, addProduct } from '../utils/apiCalls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '../utils/faIcons'
import { useState } from 'react'
import { ExportButton } from '../components/ExportButton'

export { getProducts as loader }
export { addProduct as action }

export default function Products() {
  const products = useLoaderData()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.data.filter(
    product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm) ||
      product.price.toString().includes(searchTerm)
  )

  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <div className='container py-3 flex-shrink-0 position-relative'>
        <h1 className='m-0 text-center display-5'>Products</h1>
        <ExportButton
          data={products.data}
          filename='products'
        />
      </div>

      <div className='container flex-shrink-0 px-3 mb-3'>
        <div className='input-group flex-nowrap'>
          <input
            className='form-control p-3 fs-5'
            type='text'
            placeholder='Type to search products'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <AddProductModal>
            <FontAwesomeIcon icon={faPlus} />
          </AddProductModal>
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
                <th className='text-start'>Price</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(({ name, price, id, created_at }) => {
                const formattedDate = new Date(created_at).toLocaleDateString(
                  'en-US',
                  {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric'
                  }
                )

                return (
                  <tr
                    key={id}
                    className='align-middle'
                  >
                    <td>
                      <img
                        src='https://placehold.co/75x75'
                        className='img-fluid rounded-circle my-1'
                      />
                    </td>
                    <td className='text-start'>{id}</td>
                    <td className='text-start'>{name}</td>
                    <td className='text-start'>${price.toFixed(2)}</td>
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
