import { useLoaderData } from 'react-router'
import { PageHeader } from '../components/PageHeader'
import { getDashboard } from '../utils/apiCalls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUsers,
  faBoxOpen,
  faShoppingCart,
  faDollarSign
} from '@fortawesome/free-solid-svg-icons'

export { getDashboard as loader }

export default function Dashboard() {
  const data = useLoaderData()

  const cards = [
    {
      title: 'Orders',
      value: data.stats.total_orders,
      icon: faShoppingCart,
      color: 'primary',
      bgColor: 'bg-primary-subtle border-primary-subtle',
      textColor: 'text-primary-emphasis'
    },
    {
      title: 'Total',
      value: `$${Math.round(data.stats.total_amount)}`,
      icon: faDollarSign,
      color: 'success',
      bgColor: 'bg-success-subtle border-success-subtle',
      textColor: 'text-success-emphasis'
    },
    {
      title: 'Users',
      value: data.stats.total_users,
      icon: faUsers,
      color: 'info',
      bgColor: 'bg-info-subtle border-info-subtle',
      textColor: 'text-info-emphasis'
    },
    {
      title: 'Products',
      value: data.stats.total_products,
      icon: faBoxOpen,
      color: 'warning',
      bgColor: 'bg-warning-subtle border-warning-subtle',
      textColor: 'text-warning-emphasis'
    }
  ]

  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <PageHeader title='Dashboard' />

      <div className='flex-grow-0 overflow-auto mt-0 mb-3'>
        <div className='container h-100'>
          <div className='row g-3 h-100'>
            {cards.map((card, index) => (
              <div
                key={index}
                className='col-12 col-lg-6'
              >
                <div className={`card ${card.bgColor} ${card.textColor}`}>
                  <div className='card-header p-3 border-bottom-0'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <h3 className='card-title mb-0 fw-bold'>{card.title}</h3>
                      <FontAwesomeIcon
                        icon={card.icon}
                        size='2x'
                      />
                    </div>
                  </div>
                  <div className='card-body d-flex align-items-center justify-content-center py-4'>
                    <h1 className={`display-3 text-${card.color} mb-0 fw-bold`}>
                      {card.value}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
