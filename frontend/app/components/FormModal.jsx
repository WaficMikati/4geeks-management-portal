import { InputGroup } from './InputGroup'

export function FormModal({ type, formFields }) {
  return (
    <>
      <button
        type='button'
        className='btn btn-success position-absolute start-0 text-capitalize'
        data-bs-toggle='modal'
        data-bs-target='#staticBackdrop'
      >
        Add {type}
      </button>
      <div
        className='modal fade'
        id='staticBackdrop'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <form>
              <div className='modal-header'>
                <h1
                  className='modal-title fs-5 text-capitalize'
                  id='staticBackdropLabel'
                >
                  Add New {type}
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
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
                  data-bs-dismiss='modal'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='btn btn-success'
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
