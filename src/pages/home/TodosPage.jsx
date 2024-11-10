import { useState } from 'react'
import { TodosProvider } from '../../components/context/TodosContext'
import AddTodoForm from '../components/addTodoForm/AddTodoForm'
import ToDoList from '../components/toDoList/ToDoList'
import styles from './home.styles.module.css'

const TodosPage = () => {
  const [todos, addTodo, deleteTodo, editTodo] = useState([])

  return (
    <div className={styles.dashboard}>
      <TodosProvider value={{ todos, addTodo, deleteTodo, editTodo }}>
        <AddTodoForm />
        <ToDoList />
      </TodosProvider>
    </div>
  )
}

export default TodosPage
