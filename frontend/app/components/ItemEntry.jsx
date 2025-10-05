import { Link } from 'react-router'

export function ItemEntry({ name, email, amount, id, createdAt, hideAction }) {
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  })

  return (
    <tr className='align-middle'>
      <td>
        <img
          src='https://placehold.co/75x75'
          alt='...'
          className='img-fluid rounded-circle my-1'
        />
      </td>
      <td className='text-start'>{id}</td>
      <td className='text-start'>{name}</td>
      <td className='text-start'>
        {email && <a href={`mailto:${email}`}>{email}</a>}
        {amount && `$${amount.toFixed(2)}`}
      </td>
      <td>{formattedDate}</td>
      {!hideAction && (
        <td className='text-center'>
          <Link
            to={email ? `/users/${id}/orders` : '#'}
            className='btn btn-primary'
          >
            See {email ? 'Orders' : 'User'}
          </Link>
        </td>
      )}
    </tr>
  )
}
