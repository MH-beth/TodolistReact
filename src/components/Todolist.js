import React from "react";
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import SvgIcon from '@material-ui/core/SvgIcon';
import "./assets/Todolist.css";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

const SimpleAlert = ({severity , text}) => {
    const classes = useStyles();
    return(
        <div className = {classes.root}>
            <Alert severity={severity}>
            <AlertTitle>Oops an Error have occured</AlertTitle>
                {text}
            </Alert>
        </div>
    );
};

const Todolist = () => {
    const classes = useStyles();
    const [statue , setStatue] = React.useState("");
    let [tasks , setTasks] = React.useState([]);
    let stringTasks = tasks.toString();
    let realTasks = stringTasks.split(",")
    const [item , setItem] = React.useState("");
    const addTask = () => {
        if(item.length > 0)
        {
            setTasks(tasks.concat(item));
            <SimpleAlert severity="success" text = "SuccessFully added"/>
            setItem("");
        }else{
            <div className={classes.root}>
                <SimpleAlert severity="error" text="You Can't add and empty element"/>
            </div>
            
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
            <div className = "inputs">
                <div className="realInput">
                <a className="unique" onClick = {() => {console.log("clicked")}}><HomeIcon/></a>
                <input type = "text" 
                placeholder = "Your Task"
                onChange = {(e) => setItem(e.target.value)}>
                </input>
                </div>
            </div>
            <br/>
            <button onClick={addTask}>Add Task</button>
            <p className = "statue"
            onClick = {()=> setStatue("")}>{statue}</p>
        </div>
    );
};

export default Todolist;