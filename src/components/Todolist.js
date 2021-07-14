import React from "react";
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import DoneIcon from '@material-ui/icons/Done';
import SvgIcon from '@material-ui/core/SvgIcon';
import "./assets/Todolist.css";
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AddBoxIcon from '@material-ui/icons/AddBox';

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
    let [tasks , setTasks] = React.useState([]);
    let stringTasks = tasks.toString();
    let realTasks = stringTasks.split(",")
    const [item , setItem] = React.useState("");
    const [totalTasks , setTotalTasks] = React.useState(tasks.length);
    const [tasksDone , setTasksDone] = React.useState(0);
    const [donElements ,setDoneElements] = React.useState([])
    const addTask = () => {
        if(item.length > 0)
        {
            setTasks(tasks.concat(item));
            setTotalTasks(totalTasks+1);
            <SimpleAlert severity="success" text = "SuccessFully added"/>
            setItem("");
        }else{
            <div className={classes.root}>
                <SimpleAlert severity="error" text="You Can't add and empty element"/>
            </div>
            
        }
    };
    if(totalTasks < 0)
    {
        setTotalTasks(0);
    }
    if(tasksDone > totalTasks )
    {
        setTasksDone(totalTasks);
    }
    if(tasksDone < 0)
    {
        setTasksDone(0);
    }
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
                                setTasksDone(tasksDone + 1);
                                setTasks(tasks.filter(task => task !== "This Task Is Done"));
                            }}><Tooltip title="Done"><DoneIcon/></Tooltip></button><button onClick = {() => {setTasks(tasks.filter(task1 =>task1!== task));
                            setTotalTasks(totalTasks-1)}}>
                                <Tooltip title = "Delete"><DeleteIcon/></Tooltip>
                                </button></li>
                        );
                    })}
                </ul>
                <div className="statue">
                <p>Total Tasks Done : {tasksDone}/{totalTasks}</p>
                <p>Task Done Rate : {Math.round((tasksDone/totalTasks)*100)}%</p>
                </div>
            </div>
            <br/><br/>
            <label htmlFor="title" className="labels">Add Your Task</label>
            <br/><br/>
            <div className = "inputs">
                <div className="realInput">
                <a className="unique" onClick = {() => {console.log("clicked")}}><PlaylistAddCheckIcon/></a>
                <input type = "text" 
                placeholder = "Your Task"
                onChange = {(e) => setItem(e.target.value)}>
                </input>
                </div>
            </div>
            <br/>
            <button className = "hello" onClick={addTask}> <AddBoxIcon className=  "icon"/>  Add Task</button>
        </div>
    );
};

export default Todolist;