import { useState } from 'react'
import { useTodos } from '../../../components/context/TodosContext'
import styles from './add.styles.module.css'

const AddTodoForm = () => {
  const { addTodo } = useTodos()
  const initialTodoState = {
    name: '',
    description: '',
    creator: '',
    isCompleted: false,
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
          name="name"
          value={newTodo.name}
          placeholder="Nombre de la tarea"
          onChange={handleChange}
          required
          className={styles.todoInput}
        />
        <input
          type="text"
          name="description"
          value={newTodo.description}
          placeholder="Descripción de la tarea"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="creator"
          value={newTodo.creator}
          placeholder="Autor de la tarea"
          onChange={handleChange}
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
