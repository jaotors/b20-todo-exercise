const todoInput = document.querySelector('[data-todo-input]')
const todoList = document.querySelector('[data-todo-list]')
const searchInput = document.querySelector('[data-search-input]')

let todoState = []
let editId = -1

const reset = () => {
  editId = -1
  todoInput.value = ''
  searchInput.value = ''
}

const addTodo = (content = '') => {
  if (content === '') return

  todoState.push({ id: new Date().getTime(), content })
  reset()
  displayTodoList()
}


const updateTodo = (id, content = '') => {
  const idx = todoState.findIndex((val) => val.id === id)
  todoState[idx] = { ...todoState[idx], content }
  reset()
  displayTodoList()
}

const deleteTodo = (id) => {
  const filteredTodoState = todoState.filter((val) => val.id !== id)
  todoState = filteredTodoState
  reset()
  displayTodoList()
}

const searchList = (keyword = '') => {
  const filteredTodo = todoState.filter((val) =>
    val.content.toLowerCase().includes(keyword)
  )

  if (filteredTodo.length) {
    displayTodoList(filteredTodo)
  } else {
    displayTodoList()
  }
}

const displayTodoList = (state = todoState) => {
  todoList.innerHTML = ''
  for (let i = 0; i < state.length; i++) {
    const { id, content } = state[i]
    const li = document.createElement('li')
    const spanContent = document.createElement('span')
    const btnDelete = document.createElement('button')
    const btnEdit = document.createElement('button')

    spanContent.textContent = content
    btnDelete.textContent = 'Delete'
    btnEdit.textContent = 'Edit'

    btnEdit.addEventListener('click', () => {
      editId = id
      todoInput.value = content
      todoInput.focus()
    })
    btnDelete.addEventListener('click', () => deleteTodo(id))

    li.appendChild(spanContent)
    li.appendChild(btnEdit)
    li.appendChild(btnDelete)

    todoList.appendChild(li)
  }
}

todoInput.addEventListener('keyup', (e) => {
  const val = e.target.value
  if (e.key === 'Enter') {
    if (editId > -1) {
      updateTodo(editId, val)
    } else {
      addTodo(val)
    }
  }
})

searchInput.addEventListener('keyup', (e) => {
  const val = e.target.value
  if (todoState.length) {
    searchList(val)
  }
})
