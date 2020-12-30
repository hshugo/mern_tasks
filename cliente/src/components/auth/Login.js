import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/authentication/authContext";

const Login = (props) => {

    //if i want access to the functions
    const alertContext = useContext(AlertContext);
    const {alert, showAlert} = alertContext;

    const authContext  = useContext(AuthContext);
    const {authenticated, msg, initSession} = authContext;

    //in case of password or user don't exist
    useEffect(()=>{
        //Redirect to projects
        if(authenticated) {
            props.history.push('/projects')
        }
        //this get after create to reduce, and you can se that in auth reducer
        if(msg) {
            showAlert(msg.msg,msg.category);
        }
        //Para que no cicle
        // eslint-disable-next-line
    },[msg,authenticated, props.history]);

    //state object
    const [user, saveUser] = useState({
        email: '',
        password:''
    });

    //extract from user
    const {email, password} = user;

    const onChangeInitSession  = e => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value 
        });
    }
    //when want start session
    const onSubmit = e => {
        e.preventDefault();
        //validar campos
        if(email.trim()==='' || password.trim()==='') {
            showAlert('all fields are required', 'alerta-error');
        }
        //send to action
        initSession({email, password});
    }

    return (
        <div className="form-usuario" onSubmit={onSubmit}>
            {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Session</h1>
                <form>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Your Name" 
                            value={email}
                            onChange={onChangeInitSession}
                            />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your Password"
                            value={password}
                            onChange={onChangeInitSession}
                            />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Session" />
                    </div>
                </form>
                <Link to={'/new-account'} className='enlace-cuenta'>Obtener Cuenta</Link>
            </div>
        </div>
    );
}

export default Login;