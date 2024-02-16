import { useRef, useState } from "react";
import "./style.css";

const App = () => {
  const [todo, setTodo] = useState([]);

  const [todoItm, setTodoItm] = useState({});

  const num = useRef(0);

  const todoUpdate = (e) => {
    e.preventDefault();
    if (todoItm.content.length < 2) {
      alert("더입력해");
      return;
    }
    setTodo([...todo, todoItm]);

    setTodoItm({
      content: "",
    });

    num.current = num.current + 1;
  };

  const inputHandler = (e) => {
    const { value } = e.target;
    setTodoItm({ id: num.current, content: value, done: false });
  };

  const done = (idx) => {
    const r = todo.filter((it) => it.id !== idx);
    setTodo(r);
    console.log(idx);
  };

  const modify = (idx) => {
    const r = todo.map((it) =>
      it.id === idx
        ? {
            id: it.id,
            content: it.content,
            done: true,
          }
        : it
    );
    setTodo(r);
  };

  console.log(todo);
  return (
    <>
      <form onSubmit={todoUpdate} action="">
        <input
          type="text"
          onChange={inputHandler}
          value={todoItm.content || ""}
        />
        <button>todo</button>
      </form>
      <ol>
        {todo.map((it, idx) => {
          return (
            <li className={it.done ? "on" : ""} key={it.id}>
              {it.content}
              <button onClick={() => modify(it.id)}>done</button>
              <button onClick={() => done(it.id)}>delete</button>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default App;
