import { useState } from 'react'
import { useTodos } from '../../context/TodosContext'
import { useAuth } from '../../context/AuthContext'
import styles from './item.styles.module.css'
import Modal from '../modal/Modal'
import EditTodoForm from '../editTodoForm/EditTodoForm'

const ToDoItem = ({ todo, onCheckboxChange }) => {
  const { deleteTodo, setTodos } = useTodos()
  const { user } = useAuth()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const handleOpenModal = (todo) => {
    setSelectedTodo(todo)
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTodo(null)
  }
  const handleEditTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    )
    handleCloseModal()
  }

  return (
    <li className={styles.listElement}>
      <div className={styles.item}>
        <input
          type="checkbox"
          name="todoCheckbox"
          checked={todo.is_completed}
          onChange={() => onCheckboxChange(todo._id)}
        />
        <div className={styles.info}>
          <p>{todo.title}</p>
          <p>Descripción: {todo.description}</p>
          <p>Creado por:{" "} {user.id === todo.user ? user.username : "Desconocido"}</p>
        </div>

        <button onClick={() => handleOpenModal(todo)}>🖊</button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {selectedTodo && (
            <EditTodoForm todo={selectedTodo} onEdit={handleEditTodo} />
          )}
        </Modal>

        <button onClick={() => deleteTodo(todo._id)}>❌</button>
      </div>
    </li>
  )
}

export default ToDoItem
