import { Link } from 'react-router'
import { faLightbulb } from '../utils/faIcons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { toggleTheme } = useTheme()

  return (
    <nav className={`navbar navbar-expand bg-dark-subtle`}>
      <div className='container-fluid'>
        <span className='nav-brand fw-bold fs-5'>Management Portal</span>
        <ul className='navbar-nav align-items-center ms-auto'>
          <li className='nav-item'>
            <Link
              to='/'
              className='nav-link'
            >
              Dashboard
            </Link>
          </li>{' '}
          <li className='nav-item'>
            <Link
              to='/users'
              className='nav-link'
            >
              Users
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/orders'
              className='nav-link'
            >
              Orders
            </Link>
          </li>
          <li className='nav-item'>
            <button
              className='nav-link'
              onClick={toggleTheme}
            >
              <FontAwesomeIcon icon={faLightbulb} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
