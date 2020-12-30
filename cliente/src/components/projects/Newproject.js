import React, {Fragment, useState, useContext} from "react";
import projectContext from "../../context/projects/projectContext";

const NewProject = () => {
    //Get state of form
    const projectsContext = useContext(projectContext);
    const {form, errorform, showForm, newProject, showError} = projectsContext;  

    //state for projects
    const [project, saveProject] = useState({
        name:''
    });

    const {name} = project;
    
    //Read the contents of input
    const onChangeProyecto = e => {
        saveProject({
            ...project,
            [e.target.name] : e.target.value
        })
    }


    //When the user send the project
    const onSubmitProyecto = e => {
        e.preventDefault(); //for doesn´t action for default
        //Validate the project
        if (name==='') {
            showError();
            return ;
        }
        //add state the complete project
        newProject(project); // va a state le agrega el id y despues va a proyecto en el state
        //reestart form
        saveProject({
            name:''
        });
    }

    const onClickForm = () => {
        showForm();
    }
    return (
        <Fragment>
            <buttton 
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickForm}
            >   
                New Project
                
            </buttton>

            {form ?
                (<form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Name Proyecto"
                        name="name"
                        value={name}
                        onChange={onChangeProyecto}
                    />
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Add Project"    
                    />
                </form>
                ) : null }
            {errorform ? <p className='mensaje error'>The name of the project is required </p>: null}
        </Fragment> 
    )
}

export default NewProject;