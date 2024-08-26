import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TodoBox from './Components/Todo';


function App() {
  const [todos, setTodo] = useState([]);
  const url = "http://localhost:8080/todos";

  function onSubmit(e) {
    e.preventDefault();

    const fn = new FormData(e.target);
    const user = Object.fromEntries(fn.entries());

    const now = new Date();
    const timeString = now.toLocaleTimeString();
    console.log(`Current time: ${timeString}`);

    axios.post(url, { ...user, checked: false, time: timeString })
      .then(res => {
        setTodo(prevTodos => [...prevTodos, res.data]);
        let formRef = current.reset();
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    axios.get(url)
      .then(res => setTodo(res.data))
      .catch(err => console.error(err));
  }, []);
  const handleDelete = (id) => {
    setTodo(prevTodos => prevTodos.filter(todo => todo.id !== id));
};

  return (
    <div className="container">
      <center>
        <h1>Todo</h1>
        <form onSubmit={onSubmit}>
          <input type="text" name='task' placeholder='task' />
          <button type="submit">Send</button>
        </form>
      </center>
      <div className="block">
        {todos.map((todo, index) => (
          <TodoBox key={todo.id} todo={todo} index={index} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default App;
