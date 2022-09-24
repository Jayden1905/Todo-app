// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  getTodos();
  todoButton.addEventListener("click", addTodo);
  todoList.addEventListener("click", deleteCheck);
  filterOption.addEventListener("change", filterTodo);
});

// Functions
const addTodo = (e) => {
  e.preventDefault();

  // Add Todo to localStorage
  saveLocalTodo(todoInput.value);

  const html = `
  <div class="todo">
    <li class="todo-item">${todoInput.value}</li>
    <button class="complete-btn">
      <i class='fas fa-check'></i>
    </button>
    <button class="trash-btn">
      <i class='fas fa-trash'></i>
    </button>
  </div>  
`;

  todoList.insertAdjacentHTML("beforeend", html);
  todoInput.value = "";
};

const deleteCheck = (e) => {
  const item = e.target;

  // Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function() {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
};

const filterTodo = (e) => {
  const todos = todoList.children;

  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  }
};

const saveLocalTodo = (todo) => {
  // Check
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    const html = `
    <div class="todo">
      <li class="todo-item">${todo}</li>
      <button class="complete-btn">
        <i class='fas fa-check'></i>
      </button>
      <button class="trash-btn">
        <i class='fas fa-trash'></i>
      </button>
    </div>  
  `;

    todoList.insertAdjacentHTML("beforeend", html);
  });
};

const removeLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todos.indexOf(todo.children[0].innerText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};
