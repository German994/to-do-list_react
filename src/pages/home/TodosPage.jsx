import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/context/AuthContext'
import { TodosProvider } from '../../components/context/TodosContext'
import AddTodoForm from '../components/addTodoForm/AddTodoForm'
import ToDoList from '../components/toDoList/ToDoList'
import styles from './home.styles.module.css'

const TodosPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <main className={styles.dashboard}>
      <TodosProvider>
        <AddTodoForm />
        <ToDoList />
      </TodosProvider>
    </main>
  )
}

export default TodosPage
