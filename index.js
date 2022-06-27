//selectors
const $todoInput = document.querySelector(".todo-input");
const $todoButton = document.querySelector(".todo-button");
const $todoList = document.querySelector(".todo-list");
const $moveToTrash = document.querySelector(".move-to-trash");

//event listeners
$todoButton.addEventListener("click", addTodo);

//function
function createTodoElement(toDoObject, id) {
  let title = toDoObject.title;
  //todo DIV
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("todo");
  //todo LIST
  const newTodo = document.createElement("li");
  newTodo.classList.add("new-todo-item");
  newTodo.innerText = title;
  $todoInput.value = "";
  toDoDiv.appendChild(newTodo);
  //complet button
  const completedBtn = document.createElement("button");
  completedBtn.classList.add("complete-btn");
  completedBtn.innerHTML = '<i class="fa-solid fa-square-check"></i>';
  if (toDoObject.isChecked) {
    completedBtn.classList.add("checked");
  }
  toDoDiv.appendChild(completedBtn);
  completedBtn.addEventListener("click", () => {
    if (completedBtn.classList.contains("checked")) {
      completedBtn.classList.remove("checked");
      localStorage.setItem(
        id,
        JSON.stringify({ title: title, isChecked: false })
      );
    } else {
      completedBtn.classList.add("checked");
      localStorage.setItem(
        id,
        JSON.stringify({ title: title, isChecked: true })
      );
    }
  });

  const trashBtn = document.createElement("button");
  trashBtn.classList.add("trash-btn");
  trashBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  toDoDiv.appendChild(trashBtn);
  trashBtn.addEventListener("click", () => {
    $moveToTrash.classList.remove("hidden");
    let popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `<i class="fa-solid fa-trash popup-trash"></i>
    <h2>Do you want to trash your task?</h2>
    <p class="task-title">"${title}"</p>`;

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = `Delete`;
    popup.appendChild(deleteBtn);

    let cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel-btn");
    cancelBtn.innerHTML = `Cancel`;
    popup.appendChild(cancelBtn);

    $moveToTrash.appendChild(popup);

    deleteBtn.addEventListener("click", () => {
      toDoDiv.remove();
      localStorage.removeItem(id);
      popup.remove();
      $moveToTrash.classList.add("hidden");
    });
    cancelBtn.addEventListener("click", () => {
      popup.remove();
      $moveToTrash.classList.add("hidden");
    });
  });
  // append to list
  $todoList.appendChild(toDoDiv);
}

function addTodo() {
  let id = "taskId" + Math.random().toString(16).slice(2);
  let toDoObject = { title: $todoInput.value, isChecked: false };
  localStorage.setItem(id, JSON.stringify(toDoObject));
  createTodoElement(toDoObject, id);
}

function loadToDoesFromLocalStorage() {
  let ids = Object.keys(localStorage).filter(function (key) {
    return key.includes("taskId");
  });
  let args = ids.map(function (id) {
    return { id: id, toDoObject: JSON.parse(localStorage.getItem(id)) };
  });
  args.forEach(function (arg) {
    createTodoElement(arg.toDoObject, arg.id);
  });
}
loadToDoesFromLocalStorage();
