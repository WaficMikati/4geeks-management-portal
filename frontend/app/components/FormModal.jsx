import { Form, useActionData, useNavigation } from 'react-router'
import { useState, useEffect } from 'react'
import { InputGroup } from './InputGroup'

export function FormModal({ type, formFields }) {
  const [isOpen, setIsOpen] = useState(false)
  const actionData = useActionData()
  const navigation = useNavigation()

  useEffect(() => {
    if (navigation.state === 'idle' && actionData && !actionData.error) {
      setIsOpen(false)
    }
  }, [navigation.state, actionData])

  if (!isOpen) {
    return (
      <button
        className='btn btn-success position-absolute start-0 ms-3 text-capitalize'
        onClick={() => setIsOpen(true)}
      >
        Add {type}
      </button>
    )
  }

  return (
    <>
      <button
        className='btn btn-success position-absolute start-0 text-capitalize'
        onClick={() => setIsOpen(true)}
      >
        Add {type}
      </button>

      <div
        className='modal show d-block'
        tabIndex='-1'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <Form method='post'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5 text-capitalize'>
                  Add New {type}
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
              <div className='modal-footer'>
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
