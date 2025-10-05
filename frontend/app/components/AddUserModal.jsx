import { Form, useActionData, useNavigation } from 'react-router'
import { useState, useEffect } from 'react'
import { InputGroup } from './InputGroup'

export function AddUserModal({ form, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const actionData = useActionData()
  const navigation = useNavigation()

  const formFields = [
    { name: 'name', placeholder: 'First Middle Last' },
    { name: 'email', placeholder: 'email@domain.com' }
  ]

  useEffect(() => {
    if (navigation.state === 'idle' && actionData && !actionData.error) {
      setIsOpen(false)
    }
  }, [navigation.state, actionData])

  const modalButton = (
    <span
      className={`btn btn-success text-capitalize align-content-center`}
      onClick={() => setIsOpen(true)}
    >
      {children}
    </span>
  )

  if (!isOpen) {
    return modalButton
  }

  return (
    <>
      {modalButton}
      <div
        className='modal show d-block'
        tabIndex='-1'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <Form method='post'>
              <div className='modal-header border-0'>
                <h1 className='modal-title fs-5 text-capitalize'>
                  Add New User
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  onClick={() => setIsOpen(false)}
                  aria-label='Close'
                />
              </div>
              <div className='modal-body py-0'>
                {actionData?.error && (
                  <div
                    className='alert alert-danger my-3'
                    role='alert'
                  >
                    {actionData.error}
                  </div>
                )}
                {formFields.map(({ name, placeholder }, i) => (
                  <InputGroup
                    key={i}
                    name={name}
                    placeholder={placeholder}
                  />
                ))}
              </div>
              <div className='modal-footer pt-0 border-0'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='btn btn-success'
                  disabled={navigation.state === 'submitting'}
                >
                  {navigation.state === 'submitting'
                    ? 'Submitting...'
                    : 'Confirm'}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div
        className='modal-backdrop show'
        onClick={() => setIsOpen(false)}
      />
    </>
  )
}
