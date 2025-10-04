export function InputGroup({ name, placeholder }) {
  return (
    <div className='form-floating my-3'>
      <input
        className='form-control'
        type='text'
        name={name}
        id={`floating-${name}`}
        placeholder={placeholder}
        autoComplete={name}
      />
      <label
        className='text-capitalize'
        htmlFor={`floating-${name}`}
      >
        {name}
      </label>
    </div>
  )
}
