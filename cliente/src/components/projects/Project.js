import React, {useContext} from "react";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";

const Project = ({project}) => {

    //Get state of projects
    const projectsContext = useContext(projectContext);
    const {projectCurrent} = projectsContext;  

    const tasksContext = useContext(taskContext);
    const {getTasks} = tasksContext;  

    //Funcion para agregar el projecto actual
    const choiceProject = id => {
        projectCurrent(id);
        getTasks(id);
    }
    
    return (
        <li>
            <button 
                type="button"
                className="btn btn-blank" 
                onClick={()=> choiceProject(project._id)}>{project.name}</button>
        </li>
    )
}

export default Project;