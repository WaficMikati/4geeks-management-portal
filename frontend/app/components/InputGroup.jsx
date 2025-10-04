export function InputGroup({ name, placeholder }) {
  return (
    <div className='input-group mb-2'>
      <label
        className='w-25 input-group-text text-capitalize'
        htmlFor={`${name}-input`}
      >
        {name}
      </label>
      <input
        id={`${name}-input`}
        type='text'
        className='form-control'
        placeholder={placeholder}
        autoComplete={name}
        required
      />
    </div>
  )
}
