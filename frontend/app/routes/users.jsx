import { FormModal } from '../components/FormModal'

export default function Users() {
  const formFields = [
    {
      name: 'name',
      placeholder: 'First Middle Last'
    },
    {
      name: 'email',
      placeholder: 'email@domain.com'
    }
  ]

  return (
    <div className='container-fluid'>
      <div className='d-flex justify-content-center align-items-center position-relative mb-2'>
        <FormModal
          type='user'
          formFields={formFields}
        />
        <h1 className='m-0'>Users</h1>
      </div>
    </div>
  )
}
