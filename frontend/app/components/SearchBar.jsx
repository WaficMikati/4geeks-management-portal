export function SearchBar({ value, onChange, placeholder, children }) {
  return (
    <div className='container flex-shrink-0 px-3 mb-3'>
      <div className='input-group flex-nowrap'>
        <input
          className='form-control p-3 fs-5'
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {children}
      </div>
    </div>
  )
}
