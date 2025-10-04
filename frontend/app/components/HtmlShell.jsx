import 'bootstrap/dist/css/bootstrap.min.css'
import { Links, Meta, Scripts, ScrollRestoration } from 'react-router'
import Navbar from './Navbar'

export default function HtmlShell({
  children,
  title = 'React Router Template'
}) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className='d-flex flex-column vh-100'>
          <Navbar />
          <div className='flex-grow-1 d-flex flex-column overflow-hidden'>
            {children}
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
