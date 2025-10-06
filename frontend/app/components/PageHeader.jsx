import { ExportButton } from './ExportButton'

export function PageHeader({ title, data, filename, children }) {
  return (
    <div className='container py-3 flex-shrink-0 position-relative d-flex align-items-center'>
      {children}
      <h1 className='m-0 text-center display-5 flex-grow-1'>{title}</h1>
      {data && filename && (
        <ExportButton
          data={data}
          filename={filename}
        />
      )}
    </div>
  )
}
