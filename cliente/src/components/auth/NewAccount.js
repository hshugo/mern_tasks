import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/authentication/authContext";

const NewAccount= (props) => {

    //state object
    const [user, saveUser] = useState({
        name:'',
        email: '',
        password:'',
        confirm:''
    });
    //if i want access to the functions
    const alertContext = useContext(AlertContext);
    const {alert, showAlert} = alertContext;

    const authContext  = useContext(AuthContext);
    const {authenticated, msg, registerUser} = authContext;

    //if case of the user exist 
    useEffect(()=>{
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

    //extract from user
    const {name, email, password, confirm} = user;

    const onChangeInitSession  = e => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value 
        });
    }
    //when want start session
    const onSubmit = e => {
        e.preventDefault();
        //validar campos empty
        if ( name.trim() === '' || 
            email.trim() === '' || 
            password.trim() === '' || 
            confirm.trim() === '' ) {
                showAlert('All fields are required','alerta-error');
                return;
        }
        //passwor more than six characters
        if (password.length < 6) {
            showAlert('The password is less than six characters', 'alerta-error');
            return;
        }
        //Two passwords will be equal
        if(password!==confirm){
            showAlert('The passwords are differents' , 'alerta-error');
            return;
        }
        //pasarlo al action
        registerUser({name, email, password});
    }

    return (
        <div className="form-usuario" onSubmit={onSubmit}>
            {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener Una Cuenta</h1>
                <form>
                <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Your Name" 
                            value={name}
                            onChange={onChangeInitSession}
                            />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Your Email" 
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
                        <label htmlFor="confirm">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder="Repeat Password"
                            value={confirm}
                            onChange={onChangeInitSession}
                            />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrar" />
                    </div>
                </form>
                <Link to={'/new-account'} className='enlace-cuenta'>Iniciar Session</Link>
            </div>
        </div>
    );
}

export default NewAccount;