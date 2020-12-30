import React, {Fragment, useContext} from "react";
import Task from "./Task";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
const ListTasks = () => {
    
    /*
    const tasksProject= [
            {name:'Select Platform', state: true},
            {name:'Select Colours', state: false},
            {name:'Select Platform Pay', state: false},
            {name:'Select Hosting', state: true}
    ]
    */
    
    const projectsContext = useContext(projectContext);
    const {project, deleteProject} = projectsContext;  

    const tasksContext = useContext(taskContext);
    const {tasksproject} = tasksContext;  

    //no hay seleccionado aun 
    if(!project) return <h2>Choose a project </h2>

    //Array destructuring para extraer el proyecto actual pero la primera vez no hay proyecto seleccionado
    const [projectCurrent] = project;

    //Delete Project
    const onClickDelete = () => { //5
        deleteProject(projectCurrent._id);
    }
    return (
            <Fragment>
            <h2>Proyecto: {projectCurrent.name}</h2>
            <ul className="listado-tareas">
                {tasksproject.length===0
                    ? ( <li className="task">
                            <p>No hay Tareas</p>
                        </li>)
                    : 
                        <TransitionGroup>
                            {tasksproject.map(taskProject=> (
                            <CSSTransition
                            key={taskProject.id}
                            timeout={200}
                            classNames="tarea"
                            >
                            
                                <Task 
                                    taskProject={taskProject}/>
                               
                            </CSSTransition>    
                             ))}
                        </TransitionGroup>
                        
                    
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickDelete} //4
                >
                Eliminar Proyecto &times;
            </button>
            </Fragment>
    )
}

export default ListTasks;