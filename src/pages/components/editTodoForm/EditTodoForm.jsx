import { useTodos } from '../../../components/context/TodosContext'

const EditTodoForm = ({ todoEdited, setTodoEdited, setIsEditing, todo }) => {
  const { editTodo } = useTodos()

  const handleEditTodo = () => {
    editTodo(todo.id, todoEdited)
    setIsEditing(false)
  }

  return (
    <div>
      <form
        method="put"
        onSubmit={(e) => {
          e.preventDefault()
          handleEditTodo()
        }}
      >
        <input
          type="text"
          name="name"
          value={todoEdited.name}
          placeholder="Nombre de la tarea"
          onChange={(e) =>
            setTodoEdited((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
        <input
          type="text"
          name="description"
          value={todoEdited.description}
          placeholder="Descripción de la tarea"
          onChange={(e) =>
            setTodoEdited((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
        />
        <input
          type="text"
          name="creator"
          value={todoEdited.creator}
          placeholder="Autor de la tarea"
          onChange={(e) =>
            setTodoEdited((prevState) => ({
              ...prevState,
              creator: e.target.value,
            }))
          }
        />
        <button type="submit">✅</button>{' '}
      </form>
    </div>
  )
}

export default EditTodoForm
