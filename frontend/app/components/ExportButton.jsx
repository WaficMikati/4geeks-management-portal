import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '../utils/faIcons'

export function ExportButton({ data, filename }) {
  function handleExport() {
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      className='btn btn-primary fs-5 mb-3 mb-md-0'
      onClick={handleExport}
      title='Export to JSON'
    >
      <FontAwesomeIcon
        icon={faDownload}
        className='me-2'
      />
      Export JSON
    </button>
  )
}
