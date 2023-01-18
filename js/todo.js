const todoInput = document.querySelector(".todoInput");
const todoForm = document.querySelector(".todo-form");
const toDoListUl = document.querySelector(".todo-list");
const todoCount = document.querySelector(".todoCount");
let saveToDo = [];

function cheackTodoLen() {
  todoCount.innerText = saveToDo.length;
}

//TODO 삭제
function delBtnClick(event) {
  const list = event.target.parentElement;
  list.remove();
  saveToDo = saveToDo.filter((aa) => aa.id !== parseInt(list.id));
  localStorage.setItem("data", JSON.stringify(saveToDo));
  cheackTodoLen();
}

//TODO, 버튼 생성
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

//TODO 제어
function toDoSubmit(event) {
  event.preventDefault();
  if (saveToDo.length <= 19) {
    const saveToDoObject = {
      text: todoInput.value,
      id: Date.now(),
    };
    addToDo(saveToDoObject);
    saveToDo.push(saveToDoObject);
    localStorage.setItem("data", JSON.stringify(saveToDo));
    todoInput.value = "";
    cheackTodoLen();
  } else {
    todoInput.value = "";
  }
}

const savedToDo = localStorage.getItem("data");
if (savedToDo !== null) {
  const reloadToDos = JSON.parse(savedToDo);
  saveToDo = reloadToDos;
  reloadToDos.forEach(addToDo);
}
cheackTodoLen();
todoForm.addEventListener("submit", toDoSubmit);

//TODO PLACEHOLDER
todoInput.addEventListener("focus", () => {
  todoInput.placeholder = "";
});
todoInput.addEventListener("blur", () => {
  todoInput.placeholder = "Todo-list";
});
