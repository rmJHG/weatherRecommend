const todoInput = document.querySelector(".todoInput");
const todoForm = document.querySelector(".todo-form");
const toDoListUl = document.querySelector(".todo-list");
let saveToDo = [];
function delBtnClick(event) {
  const list = event.target.parentElement;
  list.remove();
  saveToDo = saveToDo.filter((aa) => aa.id !== parseInt(list.id));
  console.log(saveToDo);
  localStorage.setItem("data", JSON.stringify(saveToDo));
}

function addToDo(inputdata) {
  const toDoLi = document.createElement("li");
  toDoLi.id = inputdata.id;
  const toDoSpan = document.createElement("span");
  toDoSpan.innerText = inputdata.text;
  const delBtn = document.createElement("button");
  delBtn.innerText = "X";
  delBtn.addEventListener("click", delBtnClick);
  toDoLi.appendChild(toDoSpan);
  toDoLi.appendChild(delBtn);
  toDoListUl.appendChild(toDoLi);
}
function toDoSubmit(event) {
  event.preventDefault();
  const saveToDoObject = {
    text: todoInput.value,
    id: Date.now(),
  };
  addToDo(saveToDoObject);
  saveToDo.push(saveToDoObject);
  localStorage.setItem("data", JSON.stringify(saveToDo));
  todoInput.value = "";
}
const savedToDo = localStorage.getItem("data");
if (savedToDo !== null) {
  const reloadToDos = JSON.parse(savedToDo);
  saveToDo = reloadToDos;
  reloadToDos.forEach(addToDo);
}
todoForm.addEventListener("submit", toDoSubmit);

todoInput.addEventListener("focus", () => {
  todoInput.placeholder = "";
});
todoInput.addEventListener("blur", () => {
  todoInput.placeholder = "Todo-list";
});