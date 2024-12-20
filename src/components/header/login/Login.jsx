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
      console.error(error.message || 'Error al iniciar sesión', error)
      setError(error.message || 'Error al iniciar sesión') // Mostrar el mensaje de error
    }
    setIsLoading(false)
  }

  return (
    <main className={styles.authContainer}>
      <div className={styles.boxContainer}>
        <h1>Iniciar Sesión:</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            {' '}
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </main>
  )
}

export default Login
