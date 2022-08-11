import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS";

//reducer는 store 만들면 꼭 만들어야하는 함수다. reducer는 data를 수정한다. reducer함수의 return 값이 중요함. 왜냐면 그게 곧 data니까
//reducer함수는 인자를 2개를 받는데 두번째가 action이다. action은 reducer가 어떤 일을 해야하는지 알려준다.
const countReducer = (count = 0, action) => {
  //여기서 state 수정해줌. 여기서는 count라고 받음

  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }

  // if (action.type === "ADD") {
  //   return count + 1;
  // } else if (action.type === "MINUS") {
  //   return count - 1;
  // } else {
  //   return count;
  // }
};

//store는 data 저장하는 곳
const countStore = createStore(countReducer);

const onChange = () => {
  number.innerText = countStore.getState();
};
//subscribe는 우리한테 store 안에 있는 변화들을 알 수 있게 해준다.
countStore.subscribe(onChange);

//action은 dispatch 함수로 보낸다.
const handleAdd = () => {
  countStore.dispatch({ type: ADD });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", () => {
  countStore.dispatch({ type: MINUS });
});

console.log(countStore.getState());
