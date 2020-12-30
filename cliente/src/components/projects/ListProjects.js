import React, { useContext, useEffect} from "react";
import Project from './Project';
import projectContext from "../../context/projects/projectContext";
import AlertContext from "../../context/alerts/alertContext";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListProjects = () => {

    //Extract projects of initial state
    const projectsContext = useContext(projectContext);
    const {msg, projects,getProjects} = projectsContext;  

    const alertContext = useContext(AlertContext);
    const {alert, showAlert} = alertContext; 
    

    //Apenas se cargue el componente obtener los proyectos
    useEffect(()=>{
        if(msg) {
            //fueron seteados en el el state de Projectos
            showAlert(msg.msg,msg.category);
        }

        getProjects();
        //eslint-disable-next-line
    }, [msg]); //This parameter is one dependency!

    //Check if project have content
    if (projects.lenght===0) return <p>Create your first project</p>;

    return (
        <ul className="listado-projectos">
            { alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>):null }
            <TransitionGroup>
            {projects.map(project => (
                
                    <CSSTransition
                        timeout={200}
                        key={project._id}
                        classNames="proyecto"
                    >
                        <Project 
                            
                            project={project} 
                        />
                    </CSSTransition>    
            ))}
            </TransitionGroup>
        </ul>
    )
}

export default ListProjects;