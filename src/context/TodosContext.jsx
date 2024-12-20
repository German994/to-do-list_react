import { createContext, useState, useContext, useEffect } from 'react'

const TodosContext = createContext()

const apiUrl = import.meta.env.VITE_API_URL

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([])
  const [token, setToken] = useState(localStorage.getItem('t'))

  const fetchTodos = async () => {
    try {
      if (!token) return // Si no hay token, no intentamos cargar tareas
      const response = await fetch(`${apiUrl}/todos`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      })
      if (!response.ok) {
        throw new Error('Error al obtener las tareas')
      }

      const data = await response.json()
      setTodos(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  // TODO Manejar la persistencia de la sesión al recargar la pagina
  useEffect(() => {
    if (token) {
      fetchTodos()
    }
  }, [token])

  const addTodo = async (newTodo) => {
    try {
      const response = await fetch(`${apiUrl}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(newTodo),
      })

      const data = await response.json()
      setTodos((prevTodos) => [...prevTodos, data])
      console.log('La tarea ha sido agregada:', data)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTodo = async (todoId) => {
    try {
      const response = await fetch(`${apiUrl}/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      })
      if (!response.ok) {
        throw new Error('Error al eliminar la tarea')
      }

      const data = await response.json()
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId))
      console.log('La tarea ha sido eliminada')
    } catch (error) {
      console.error(error)
    }
  }

  const editTodo = async (todoId, updatedTodo) => {
    try {
      const response = await fetch(`${apiUrl}/todos/${todoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(updatedTodo),
      })
      if (!response.ok) {
        throw new Error('Error al editar la tarea')
      }

      const data = await response.json()
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === todoId ? data : todo))
      )
      console.log('La tarea ha sido editada')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        editTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}

export const useTodos = () => useContext(TodosContext)
