import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addTodo = (text) => {
  return { type: ADD_TODO, text };
};

const deleteTodo = (id) => {
  return { type: DELETE_TODO, id };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodoObj = { text: action.text, id: Date.now() };
      return [newTodoObj, ...state];
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== parseInt(action.id)); // string 형태라서 넘버로 바꿔야한다!!
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text));
};

const dispatchDeleteTodo = (e) => {
  const id = e.target.parentNode.id;
  store.dispatch(deleteTodo(id));
};

const paintTodo = () => {
  const todo = store.getState();
  ul.textContent = ""; // 이거 없으면 store 바뀔때마다 모든 것을 repainting 한다.
  //innerHTML 와 textContent 메서드 모두 텍스트 값을 읽어오고, 설정할 수 있는 기능을 한다. innerHTML는 보안에 취약함

  todo.forEach((todo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DELETE";
    btn.addEventListener("click", dispatchDeleteTodo);
    li.id = todo.id;
    li.innerText = todo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintTodo); // todo의 변화에 맞게 repainting 하고 있다.

// const createTodo = (todo) => {
//   const li = document.createElement("li");
//   li.innerText = todo;
//   ul.appendChild(li);
// };

const onSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  input.value = "";
  //createTodo(todo);
  dispatchAddTodo(todo);
};

form.addEventListener("submit", onSubmit);
