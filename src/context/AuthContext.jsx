import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const apiUrl = import.meta.env.VITE_API_URL

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // Cargar el usuario desde localStorage al inicializar
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('t')
      if (token) {
        try {
          const response = await fetch(`${apiUrl}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (!response.ok) {
            throw new Error('No se pudo autenticar')
          }

          const data = await response.json()
          setUser(data) // Establece el usuario
        } catch (error) {
          console.error('Error al cargar el usuario:', error.message)
        }
      }
    }

    loadUser()
  }, [])

  const register = async (username, email, password) => {
    try {
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })

      const data = await res.json()
      localStorage.setItem('t', data.accessToken)
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      console.log('Registrado correctamente')
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (email, password) => {
    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await res.json()
      localStorage.setItem('t', data.accessToken)
      setUser(data.user)
    } catch (error) {
      console.error('Error al iniciar sesión', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('t')
    setUser(null)
    console.log('Sesión cerrada')
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
