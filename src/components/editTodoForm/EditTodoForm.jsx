import { useState } from 'react'
import { useTodos } from '../../context/TodosContext'
import styles from '../modal/modal.styles.module.css'

const EditTodoForm = ({ todo }) => {
  const { todos, editTodo } = useTodos()
  const [todoEdited, setTodoEdited] = useState(todo)

  const handleSubmit = (e) => {
    e.preventDefault()
    editTodo(todoEdited._id, todoEdited)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTodoEdited((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (todoId) => {
    const todoToUpdate = todos.find((todo) => todo._id === todoId)
    const updatedTodo = {
      ...todoToUpdate,
      is_completed: !todoToUpdate.is_completed,
    }
    editTodo(todoId, updatedTodo)
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <input
            type="checkbox"
            name="todoCheckbox"
            checked={todoEdited.is_completed}
            onChange={() => handleCheckboxChange(todo._id)}
          />
        </div>
        <div className={styles.formField}>
          <input
            type="text"
            name="title"
            value={todoEdited.title}
            placeholder="Nombre de la tarea"
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formField}>
          <input
            type="text"
            name="description"
            value={todoEdited.description}
            placeholder="Descripción de la tarea"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">✅</button>{' '}
      </form>
    </div>
  )
}

export default EditTodoForm
