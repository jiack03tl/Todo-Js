document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.querySelector(".add_btn");
  const todoMain = document.querySelector(".todo_main");
  const dateInput = document.querySelector(".add_date");
  const todoInput = document.querySelector(".add_todo");

  // Load todos from localStorage
  function loadTodos() {
    todoMain.innerHTML = "";
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((todo) => displayTodo(todo));
  }

  // Display a single todo item
  function displayTodo(todo) {
    const todoWrap = document.createElement("div");
    todoWrap.classList.add("todo_wrap");
    todoWrap.setAttribute("data-id", todo.id);

    todoWrap.innerHTML = `
        <div class="todo_date">${todo.date}<button class="delete_btn">&#10005;</button></div>
        <div class="todo_content">${todo.content}</div>
        
      `;

    todoMain.appendChild(todoWrap);

    // Delete functionality
    todoWrap
      .querySelector(".delete_btn")
      .addEventListener("click", function () {
        deleteTodo(todo.id);
      });
  }

  // Add a new todo
  function addTodo() {
    const date = dateInput.value;
    const content = todoInput.value.trim();
    if (!date || !content) return alert("Please enter a date and todo content");

    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const newTodo = {
      id: Date.now(),
      date,
      content,
    };

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    displayTodo(newTodo);
    dateInput.value = "";
    todoInput.value = "";
  }

  // Delete a todo
  function deleteTodo(id) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodos();
  }

  addBtn.addEventListener("click", addTodo);
  loadTodos();
});
