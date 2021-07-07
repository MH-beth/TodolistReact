import React from "react";
import "./assets/Todolist.css";

const Todolist = () => {
    const [statue , setStatue] = React.useState("");
    let [tasks , setTasks] = React.useState([]);
    let stringTasks = tasks.toString();
    let realTasks = stringTasks.split(",")
    const [item , setItem] = React.useState("");
    const addTask = () => {
        if(item.length > 0)
        {
            setTasks(tasks.concat(item));
            setItem("");
        }else{
            setStatue("You Can't Add an empty Element");
            
        }
    };
    return(
        <div className = "mains">
            <h1 className = "name">Todolist</h1>
            <div className = "tasks">
                <h2 className = "task">Your Tasks</h2>
                <ul>
                    {realTasks.map((task , i) => {
                        return(
                            <li key={i}>{task} <button onClick = {() => {
                                let taskIndex = tasks.indexOf(task);
                                tasks[taskIndex] = "This Task Is Done";
                                setTasks(tasks.filter(task => task !== "This Task Is Done"));
                            }}>Done</button></li>
                        );
                    })}
                </ul>
            </div>
            <br/><br/>
            <label htmlFor="title" className="labels">Add Your Task</label>
            <br/><br/>
            <input type = "text" 
            placeholder = "Your Task"
            onChange = {(e) => setItem(e.target.value)}></input>
            <br/>
            <button onClick={addTask}>Add Task</button>
            <p className = "statue"
            onClick = {()=> setStatue("")}>{statue}</p>
        </div>
    );
};

export default Todolist;