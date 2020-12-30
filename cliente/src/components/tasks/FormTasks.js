import React, {useContext, useState, useEffect} from "react";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";

const FormTask = () => {

    //Mostrar si un proyecto esta activo
    const projectsContext = useContext(projectContext);
    const {project} = projectsContext;  

    const tasksContext = useContext(taskContext);
    const {taskselected, addTask, validateTask, taskerror, getTasks, saveTaskUpdate, clearTask} = tasksContext;

    //UseEffect detect if there is one task selected
    useEffect(() => {
        if (taskselected!==null){
            saveTask(taskselected);
        } else {
            saveTask({
                name:''
            });
        }
    },[taskselected]);
    //State of Form
    const[task, saveTask] = useState ({
        name: ''
    })
    //destructuring
    const {name} = task;

    if (!project) return null;

    //Array destructuring para extraer el proyecto actual pero la primera vez no hay proyecto seleccionado
    const [projectCurrent] = project;

    //Read the values of form
    const handleChange = e => {
        saveTask({
            ...task,
            [e.target.name] : e.target.value
        })
    }


    //Same submit for save and add
    const onSubmit = e => {
        e.preventDefault(); // sin esto se submitea

        //validate
        if( name.trim() === '' ) {
            validateTask();
            return;
        }
        //Verify if is Add or Edit
        if (taskselected === null) {
            //add the new task to state of tasks
            task.projectId = projectCurrent.id;
            task.state = false;
            addTask(task);
        } else {
            saveTaskUpdate(task);
            //DElete state selected
            clearTask();
        }


        //Get tasks of project Current
        getTasks(projectCurrent.id);
        //restart the form
        saveTask({
            name:''
        });
    }

    return (
        <div className="formulario" >
            <form onSubmit={onSubmit}>
                <div className="formulario">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Name Task..."
                        name="name"
                        value={name}
                        onChange={handleChange}
                    ></input>
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={taskselected ? 'Edit Task' : 'Add Task'}
                    ></input>
                </div>
            </form>
            {taskerror ? <p className="mensaje error">The name of the task is required</p> : null}
        </div>
    )
}

export default FormTask;