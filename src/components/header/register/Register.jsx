import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import styles from '../auth.styles.module.css'

const Register = () => {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await register(username, email, password)
      navigate('/login')
    } catch (error) {
      console.error(error.message)
    }
  }
  const handleCancel = () => {
    navigate('/')
  }

  return (
    <main className={styles.authContainer}>
      <h1>Crear cuenta:</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            onChange={(e) => setUsername(e.target.value)}
          />
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
        <button type="submit">
          {' '}
          {isLoading ? 'Cargando...' : 'Registrarse'}
        </button>
        <button type="button" className={styles.cancelButton} onClick={handleCancel}>
          Cancelar
        </button>
      </form>
    </main>
  )
}

export default Register
