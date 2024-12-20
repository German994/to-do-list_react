import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const apiUrl = import.meta.env.VITE_API_URL

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // TODO Manejar la persistencia de la sesión al recargar la pagina
  useEffect(() => {
    const storedToken = localStorage.getItem('t')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser))
    }
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
      localStorage.setItem('t', data.token)
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
      localStorage.setItem('t', data.token)
      setUser(data.user)
    } catch (error) {
      console.error('Error al iniciar sesión', error)
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
