import { TodosProvider } from '../../components/context/TodosContext'
import AddTodoForm from '../components/addTodoForm/AddTodoForm'
import ToDoList from '../components/toDoList/ToDoList'
import styles from './home.styles.module.css'

const TodosPage = () => {
  return (
    <div className={styles.dashboard}>
      <TodosProvider>
        <AddTodoForm />
        <ToDoList />
      </TodosProvider>
    </div>
  )
}

export default TodosPage
