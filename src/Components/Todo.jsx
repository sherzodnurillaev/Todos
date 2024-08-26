import axios from "axios";
import "/src/App.css";
import React, { useState } from "react";

const TodoBox = ({ todo, index, onDelete }) => {
    const [checked, setChecked] = useState(todo.checked);
    const [lighted, setlighted] = useState(false);
      
    const handleClick = () => {
        setlighted(!lighted);
    };
    const url = `http://localhost:8080/todos/${todo.id}`;

    function check() {
        axios.patch(url, { checked: !checked })
            .then(res => {
                setChecked(res.data.checked);
                console.log(res);
            })
    }

    function INC() {
        axios.delete(url)
            .then(() => {
                onDelete(todo.id);
            })
            .catch(err => console.error('Error deleting task:', err));
    }

    return (
        <div className="box">
            <h2>Task {index + 1}</h2>
            <button className="delete" onClick={INC}>x</button>
            <p
            onClick={handleClick}
            className={`highlighted ${lighted ? "active" : ""}`}>{todo.task}</p>
            <div className="bottom">
                <span>{todo.time}</span>
                <div className="mid">
                    <button onClick={check}>
                        {checked ? "success" : "unsuccess"}
                    </button>
                    <img src={checked ? "/check.png" : "/un.png"} alt="status" />
                </div>
            </div>
        </div>
    );
}

export default TodoBox;
