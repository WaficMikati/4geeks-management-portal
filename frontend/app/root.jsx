import { Link, Outlet } from 'react-router'
import HtmlShell from './components/HtmlShell.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <HtmlShell>
        <Outlet />
      </HtmlShell>
    </ThemeProvider>
  )
}

export function ErrorBoundary({ error }) {
  return (
    <ThemeProvider>
      <HtmlShell>
        <div className='container py-5'>
          <div className='alert alert-danger'>
            <h2 className='alert-heading'>Something went wrong</h2>
            <p className='mb-0'>
              {error.message || 'An unexpected error occurred'}
            </p>
            <hr />
            <Link
              to='/'
              className='btn btn-primary'
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </HtmlShell>
    </ThemeProvider>
  )
}
