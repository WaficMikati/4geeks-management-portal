import { useLoaderData } from 'react-router'
import { AddItemModal } from '../components/AddItemModal'
import { SearchBar } from '../components/SearchBar'
import { PageHeader } from '../components/PageHeader'
import { getProducts, addProduct } from '../utils/apiCalls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '../utils/faIcons'
import { useState } from 'react'

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

  const productFields = [
    { name: 'name', placeholder: 'Product Name' },
    { name: 'price', placeholder: '0.00' }
  ]

  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <PageHeader
        title='Products'
        data={products.data}
        filename='products'
      />

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder='Type to search products'
      >
        <AddItemModal
          title='Add New Product'
          fields={productFields}
        >
          <FontAwesomeIcon icon={faPlus} />
        </AddItemModal>
      </SearchBar>

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
