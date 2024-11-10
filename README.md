# To-Do List

Esta aplicación de lista de tareas (To-Do List) está desarrollada en React y permite al usuario realizar operaciones crear, leer, actualizar, eliminar tareas. Además, utiliza una Json-Server para obtener y gestionar los datos de las tareas. Para en el futuro implementar APIs.

## Componentes

- App: Componente principal de la aplicación que gestiona el enrutamiento.
- Header: Componente de encabezado que contiene el título.
- TodosPage: Página principal donde se visualizan las tareas.
- AddTodoForm: Formulario para agregar nuevas tareas.
- TodoList: Lista de todas las tareas actuales, cada una representada por un ToDoItem.
- ToDoItem: Componente individual de tarea que muestra el nombre, descripción, creador de la misma y opciones para editar o eliminar la tarea.
- EditTodoForm: Formulario para editar una tarea existente.

## Contexto

- TodosContext: Contexto que proporciona el estado global de las tareas, permitiendo a los componentes consumir o actualizar la lista de tareas.

## Instalación:

1. Clona el repositorio en tu máquina local: `git clone https://github.com/German994/to-do-list_react`
2. Navega al directorio del proyecto e instala las dependencias necesarias: `npm install`
3. Inicia el servidor de la API JSON para la simulación de datos: `json-server --watch db/db.json`
4. Ejecuta la aplicación en modo de desarrollo: `npm run dev`
