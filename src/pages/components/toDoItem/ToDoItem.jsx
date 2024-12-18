import { useState } from 'react'
import { useTodos } from '../../../components/context/TodosContext'
import styles from './item.styles.module.css'
import EditTodoForm from '../editTodoForm/EditTodoForm'

const ToDoItem = ({ todo, onCheckboxChange }) => {
  const { deleteTodo } = useTodos()

  const [isEditing, setIsEditing] = useState(false)
  const [todoEdited, setTodoEdited] = useState(todo)

  return (
    <li className={styles.listElement}>
      <div className={styles.item}>
        <input
          type="checkbox"
          name="todoCheckbox"
          checked={todo.isCompleted}
          onChange={() => onCheckboxChange(todo.id)}
        />
        {isEditing ? (
          <div className={styles.info}>
            <EditTodoForm
              todo={todo}
              todoEdited={todoEdited}
              setTodoEdited={setTodoEdited}
              setIsEditing={setIsEditing}
            />
          </div>
        ) : (
          <div className={styles.info}>
            <p>{todo.name}</p>
            <p>{todo.description}</p>
            <p>{todo.creator}</p>
          </div>
        )}
        <button onClick={() => setIsEditing((openClose) => !openClose)}>
          🖊
        </button>
        <button onClick={() => deleteTodo(todo.id)}>❌</button>
      </div>
    </li>
  )
}

export default ToDoItem
