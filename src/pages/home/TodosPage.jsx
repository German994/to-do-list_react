import { useState } from 'react'
import { TodosProvider } from '../../components/context/TodosContext'
import AddTodoForm from '../components/addTodoForm/AddTodoForm'
import ToDoList from '../components/toDoList/ToDoList'
import EditTodoForm from '../components/editTodoForm/EditTodoForm'

const TodosPage = () => {
  const [todos, addTodo, deleteTodo, editTodo] = useState([])

  return (
    <div>
      <TodosProvider value={{ todos, addTodo, deleteTodo, editTodo }}>
        <AddTodoForm />
        <ToDoList />
        {/* <EditTodoForm /> */}
      </TodosProvider>
    </div>
  )
}

export default TodosPage
