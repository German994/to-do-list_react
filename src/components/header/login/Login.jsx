import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import styles from '../auth.styles.module.css'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (error) {
      console.error(error.message || 'Error al iniciar sesión', error)
    }
  }
  const handleCancel = () => {
    navigate('/')
  }

  return (
    <main className={styles.authContainer}>
      <h1>Iniciar Sesión:</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">
          {' '}
          {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </form>
    </main>
  )
}

export default Login
