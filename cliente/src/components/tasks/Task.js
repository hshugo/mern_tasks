import React, {useContext} from "react";
import taskContext from "../../context/tasks/taskContext";
import projectContext from "../../context/projects/projectContext";

const Task = ({taskProject}) => {

    const tasksContext = useContext(taskContext);
    const {deleteTask, getTasks, changeStateTask, saveTaskCurrent} = tasksContext;

    //Get state of projects
    const projectsContext = useContext(projectContext);
    const {project} = projectsContext;
    const [projectCurrent] = project; // es igual que project[0].id
    
    //function that execute when the user touch the action delete
    const deleteTaskList = taskId => {
        deleteTask(taskId);
        getTasks(projectCurrent.id);
    }

    //Function that modify state of task
    const changeState = task => {
        if (task.state) {
            task.state = false;
        } else {
            task.state = true;
        }
        changeStateTask(task);
    }

    //Add one task current when the user want edit
    const saveTask = task => {
        saveTaskCurrent(task);
    }

    return (
       <li className="tarea sombra"> 
            <p>{taskProject.name}</p>
            <div className="estado">
                {taskProject.state
                ?
                    (<button 
                        type="button"
                        className="completo"
                        onClick={() => changeState(taskProject)}
                    >Completo </button>)
                :
                    (<button 
                        type="button"
                        className="incompleto"
                        onClick={() => changeState(taskProject)}
                    >Incompleto </button>)
                }

            </div>

            <div className="estado">
                <button 
                        type="button"
                        className="btn btn-primario"
                        onClick={()=> saveTaskCurrent(taskProject) }
                    >Edit </button>
                <button 
                        type="button"
                        className="btn btn-secundario"
                        onClick={() => deleteTaskList(taskProject.id)}
                    >Delete </button>
            </div>

        </li>
    )
}

export default Task;