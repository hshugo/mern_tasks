import React, {useContext, useEffect}  from "react";
import AuthContext from '../../context/authentication/authContext';

const Barra = () => {

    //Extract the information of authentication
    const authContext = useContext(AuthContext);
    const {user, userAuthenticated, closeSession} = authContext;
    
    useEffect(()=>{
        userAuthenticated();
        //DEJO DE FUNCIONAR
    },[]) 

    return (
        <header className="app-header">
        {user? 
            <p className="nombre-usuario">Hola <pan>{user.name}</pan></p>
        : null}
            <nav className="nav-principal">
                <button className="btn btn-blank cerrar-session" 
                    onClick={ () => closeSession()} //execute close seccion directaly
                    >
                    Close Session
                </button>
            </nav>
       </header>
    )
}

export default Barra;