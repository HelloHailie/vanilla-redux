import { Discussions } from "./components/Discussions";
import { Form } from "./components/Form";
import { useState, useEffect } from "react";

function App() {
  //여기서 기본값인 discussions는 서버에서 가져와야 하니까 fetch 요청을 해야한다. // side effect 처리!!
  // 왜냐면 fetch 요청이 실패할 수도 있고, 성공할 수도 있으니까!! (같은 인풋이 들어왔을 때 같은 아웃풋을 보장할 수 없으니까)
  const domain = "http://localhost:3001";
  const [discussions, setDiscussions] = useState([]);
  useEffect(() => {
    getDiscussions(domain + "/discussions");
  }, []);

  const getDiscussions = (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDiscussions(data);
      });
  };

  return (
    <>
      <header className="App-header">
        <h1>My Agora States</h1>
        <Form></Form>
        <Discussions discussions={discussions}></Discussions>
      </header>
    </>
  );
}

export default App;
