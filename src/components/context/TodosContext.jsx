import { createContext, useState, useContext, useEffect } from 'react'

const TodosContext = createContext()

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([])
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/todos')
      const data = await response.json()
      setTodos(data)
      console.log('Tareas obtenidas:', data.length)
    } catch (error) {
      console.error('Error al obtener las tareas:', error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async (newTodo) => {
    try {
      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      })

      const data = await response.json()
      setTodos([...todos, data])
      console.log('La tarea ha sido agregada:', data)
    } catch (error) {
      console.error('Error al agregar la tarea:', error)
    }
  }

  const deleteTodo = async (todoId) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      setTodos(todos.filter((todo) => todo.id !== todoId))
      console.log('La tarea ha sido eliminada:', data)
    } catch (error) {
      console.error('Fallo al eliminar la tarea', error)
    }
  }

  const editTodo = async (todoId, updatedTodo) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      })

      const data = await response.json()
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === todoId ? data : todo))
      )
      console.log('La tarea ha sido editada:', data)
    } catch (error) {
      console.error('Error al editar la tarea:', error)
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
