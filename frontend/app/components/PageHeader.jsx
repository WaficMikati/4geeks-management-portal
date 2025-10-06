import { ExportButton } from './ExportButton'

export function PageHeader({ title, data, filename, children }) {
  return (
    <div className='container flex-shrink-0'>
      <div className='row align-items-center'>
        <div className='col-12 col-md text-start'>{children}</div>
        <div className='col-12 col-md text-center'>
          <h1 className='m-0 my-3 display-5 text-nowrap'>{title}</h1>
        </div>
        <div className='col-12 col-md text-center text-md-end'>
          {data && filename && (
            <ExportButton
              data={data}
              filename={filename}
            />
          )}
        </div>
      </div>
    </div>
  )
}
