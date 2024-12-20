import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './styles.module.css'

const Header = () => {
  const { user, logout } = useAuth() // Usamos 'logout' en lugar de 'logoutUser'
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header>
      <h1 className={styles.title}>My To-Do List</h1>
      <nav>
        <ul className={styles.navList}>
          {user ? (
            <>
              <li className={styles.navListLink}>
                <span>Hola, {user.email}</span>{' '}
              </li>
              <li className={styles.navListLink}>
                <span onClick={handleLogout}>Cerrar sesión</span>{' '}
              </li>
            </>
          ) : (
            <>
              <li className={styles.navListLink}>
                <Link to="/login">Iniciar Sesión</Link>
              </li>
              <li className={styles.navListLink}>
                <Link to="/register">Registrarse</Link>
              </li>
            </>
          )}
          <li className={styles.navListLink}>
            <Link to="/">Lista de tareas</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
