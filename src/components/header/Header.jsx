import { Link } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import styles from './styles.module.css'

const Header = () => {
  const { user, logoutUser } = useAuth()

  return (
    <header>
      <h1 className={styles.title}>My To-Do List</h1>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navListLink}>
            <Link to="/login">Iniciar Sesión</Link>
          </li>
          <li className={styles.navListLink}>
            <Link to="/register">Registrarse</Link>
          </li>
          <li className={styles.navListLink}>
            <Link to="/">Lista de tareas</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
