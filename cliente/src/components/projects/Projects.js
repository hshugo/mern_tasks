import React, {useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FromTasks from '../tasks/FormTasks';
import ListTasks from '../tasks/ListTasks';
import AuthContext from '../../context/authentication/authContext';
const Projects= () => {
    //Extract the information of authentication
    const authContext = useContext(AuthContext);
    const {userAuthenticated} = authContext;
    
    useEffect(()=>{
        userAuthenticated();
        //Para que no cicle
        // eslint-disable-next-line
    },[]) 
    return (
        <div className="contenedor-app">
            <Sidebar/>
            <div className="seccion-principal">
                <Barra/>
                <main>
                    <FromTasks />
                
                    <div className="contenedor-tareas">
                        <ListTasks />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Projects;