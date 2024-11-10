import { useTodos } from '../../../components/context/TodosContext'
import ToDoItem from '../toDoItem/ToDoItem'
import styles from './list.styles.module.css'

const ToDoList = () => {
  const { todos, editTodo } = useTodos()

  const todoCompleted = todos.filter((todo) => todo.isCompleted)
  const todoNotCompleted = todos.filter((todo) => !todo.isCompleted)

  const handleCheckboxChange = (todoId) => {
    const todoToUpdate = todos.find((todo) => todo.id === todoId)
    const updatedTodo = {
      ...todoToUpdate,
      isCompleted: !todoToUpdate.isCompleted,
    }
    editTodo(todoId, updatedTodo)
  }

  return (
    <div className={styles.containerElements}>
      <div className={styles.containerCompleted}>
        <h2 className={styles.title}>Tareas Pendientes:</h2>
        <ul className={styles.todoCompleted}>
          {todoCompleted.map((e) => (
            <ToDoItem
              key={e.id}
              todo={e}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </ul>
      </div>
      <div className={styles.containerPending}>
        <h2 className={styles.title}>Tareas Completadas:</h2>
        <ul className={styles.todoPending}>
          {todoNotCompleted.map((e) => (
            <ToDoItem
              key={e.id}
              todo={e}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ToDoList
