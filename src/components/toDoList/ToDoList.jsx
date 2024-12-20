import { useTodos } from '../../context/TodosContext'
import ToDoItem from '../toDoItem/ToDoItem'
import styles from './list.styles.module.css'

const ToDoList = () => {
  const { todos, editTodo } = useTodos()

  const todoCompleted = todos.filter((todo) => todo.is_completed)
  const todoNotCompleted = todos.filter((todo) => !todo.is_completed)

  const handleCheckboxChange = (todoId) => {
    const todoToUpdate = todos.find((todo) => todo._id === todoId)
    const updatedTodo = {
      ...todoToUpdate,
      is_completed: !todoToUpdate.is_completed,
    }
    editTodo(todoId, updatedTodo)
  }

  return (
    <div className={styles.containerElements}>
      <div className={styles.containerCompleted}>
        <h2 className={styles.title}>Tareas Pendientes:</h2>
        <ul className={styles.todoPending}>
          {todoNotCompleted.length > 0 ? (
            todoNotCompleted.map((todo) => (
              <ToDoItem
                key={todo._id}
                todo={todo}
                onCheckboxChange={handleCheckboxChange}
              />
            ))
          ) : (
            <li>No hay tareas pendientes.</li>
          )}
        </ul>
      </div>
      <div className={styles.containerPending}>
        <h2 className={styles.title}>Tareas Completadas:</h2>
        <ul className={styles.todoCompleted}>
          {todoCompleted.length > 0 ? (
            todoCompleted.map((todo) => (
              <ToDoItem
                key={todo._id}
                todo={todo}
                onCheckboxChange={handleCheckboxChange}
              />
            ))
          ) : (
            <li>No hay tareas completadas.</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default ToDoList
