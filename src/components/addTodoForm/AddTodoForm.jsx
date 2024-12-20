import { useState } from 'react'
import { useTodos } from '../../context/TodosContext'
import styles from './add.styles.module.css'

const AddTodoForm = () => {
  const { addTodo } = useTodos()
  const initialTodoState = {
    title: '',
    description: '',
    is_completed: false,
    user: '',
  }
  const [newTodo, setNewTodo] = useState(initialTodoState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewTodo({ ...newTodo, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    addTodo(newTodo)
    setNewTodo(initialTodoState)
  }

  return (
    <div>
      <form method="post" onSubmit={handleSubmit} className={styles.addFrom}>
        <input
          type="text"
          name="title"
          value={newTodo.title}
          placeholder="Nombre de la tarea"
          onChange={handleChange}
          maxLength="50"
          required
        />
        <input
          type="text"
          name="description"
          value={newTodo.description}
          placeholder="Descripción de la tarea"
          onChange={handleChange}
          maxLength="50"
          required
        />
        <button type="submit" className={styles.todoButton}>
          Guardar Tarea
        </button>
      </form>
    </div>
  )
}

export default AddTodoForm
