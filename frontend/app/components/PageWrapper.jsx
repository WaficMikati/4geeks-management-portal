import { FormModal } from './FormModal'

export function PageWrapper({ title, formFields, children }) {
  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <div className='container py-3 flex-shrink-0'>
        <div className='d-flex justify-content-center align-items-center position-relative'>
          <h1 className='m-0'>{title}</h1>
          <FormModal
            type='user'
            formFields={formFields}
          />
        </div>
      </div>

      <div className='flex-grow-1 overflow-auto'>
        <div className='container h-100'>{children}</div>
      </div>
    </div>
  )
}
