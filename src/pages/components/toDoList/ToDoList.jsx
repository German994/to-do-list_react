import { useTodos } from '../../../components/context/TodosContext'
import ToDoItem from '../toDoItem/ToDoItem'
import styles from './styles.module.css'

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
    <div>
      <h1>Lista de Tareas</h1>
      <h2>Tareas Completadas</h2>
      <ul className={styles.list}>
        {todoCompleted.map((e) => (
          <ToDoItem
            key={e.id}
            todo={e}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </ul>
      <h2>Tareas Pendientes</h2>
      <ul className={styles.list}>
        {todoNotCompleted.map((e) => (
          <ToDoItem
            key={e.id}
            todo={e}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
      </ul>
    </div>
  )
}

export default ToDoList
