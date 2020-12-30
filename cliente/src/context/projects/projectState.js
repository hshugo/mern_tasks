import React, {useReducer} from 'react';
//import { v4 as uuidv4 } from 'uuid';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {
    FORM_PROJECT,
    GET_PROJECTS,
    ADD_PROJECT,
    ERROR_PROJECT,
    VALIDATE_FORM,
    SELECTED_PROJECT,
    DELETE_PROJECT //2
} from '../../types/Index';

import clientAxios from "../../config/axios";

const ProjectState = props => { 

    //The projects come from DataBase
    /*
    const projects = [
        { id:1, name: 'Tienda Virtual' },
        { id:2, name: 'Intranet'},
        { id:3, name: 'Diseño'},
        { id:4, name: 'Algo'}
    ]
    */
    // minuscula porque son variables
    const initialState = {
        projects : [],
        form: false,
        errorform: false,
        project:null,
        msg: null
    }
    //use reducer es como utilizar useState
    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(projectReducer, initialState); //Es lo que retorna useReducer, nuevo    hook
    //Functions for CRUD
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    }

    const getProjects = async () => {
        try {

            const response = await clientAxios.get('/api/projects');
            console.log(response);

            dispatch({
                type: GET_PROJECTS,
                payload: response.data.projects
                //payload: projects
            });
            
        } catch (error) {
            
            //se pasan como payload al state de mensaje
            const alert = {
                msg: 'There is one Error',
                category: 'alerta-error'
            }

            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
            console.log(error);
        }
    }

    //add async because there are interaction with DB
    const newProject = async project => {
        //project.id = uuidv4();
        try {
            
            const response = await clientAxios.post('/api/projects',project);
            console.log(response);
            
            dispatch({
                type: ADD_PROJECT,
                payload: response.data
            });
            
        } catch (error) {
            
            //se pasan como payload al state de mensaje
            const alert = {
                msg: 'There is one Error',
                category: 'alerta-error'
            }

            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
            console.log(error);
        }
      
    }

    //Show Error
    const showError = () => {
        dispatch({
            type: VALIDATE_FORM
        })
    }

    //Select the project that the user choice
    const projectCurrent = projectId  => {
        //el payload es el proyecto donde el usuario hizo click
        dispatch({
            type: SELECTED_PROJECT,
            payload: projectId
        })
    }

    const deleteProject = async projectId => {

        try {

            await clientAxios.delete(`/api/projects/${projectId}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
                //payload: projects
            });
            
        } catch (error) {
            
            //se pasan como payload al state de mensaje
            const alert = {
                msg: 'There is one Error',
                category: 'alerta-error'
            }

            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            });
            console.log(error);
        }


    }
    return(
        <projectContext.Provider
            value={{
                projects: state.projects,
                form:state.form,
                errorform: state.errorform,
                msg: state.msg,
                showForm,
                getProjects,
                newProject,
                showError,
                project: state.project,
                projectCurrent,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;