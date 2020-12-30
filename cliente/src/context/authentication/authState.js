import React, {useReducer} from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';
import {
    REGISTER_SUCCESSFUL,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_SUCCESSFUL,
    LOGIN_ERROR,
    CLOSE_SESSION 
} from '../../types/Index';

import clientAxios from '../../config/axios';
import tokenAuth from '../../config/token';
const AuthState = props => {
    const initialState = { 
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        msg: null,
        loading: true
    }
    
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    
    const registerUser = async datos => {
        try {
            const response = await clientAxios.post('/api/users', datos);
            console.log("Responce of server",response);
            dispatch({
                type: REGISTER_SUCCESSFUL,
                payload: response.data
            });
            //Get the user
            userAuthenticated();
        } catch (error) {
            //console.log(error.response.data.msg); //object from axios with more information
            const alert= {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: REGISTER_ERROR,
                payload: alert
            })
        }
    }

    //functions
    //Return the user authenticated
    const userAuthenticated = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            //TODO: function for send the token by header
            //send token from localstorage to header
            tokenAuth(token);
        }
        try {
            const response = await clientAxios.get('/api/auth');
            //console.log(response);
            dispatch({
                type: GET_USER,
                payload: response.data.user
            })        
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    //when the user init session
    const initSession = async data => {
        try {
            console.log("la data:",data);
            const response = await clientAxios.post('/api/auth',data);
            console.log('DEVUELTA DEL CONTROLLER LOGIN',response.data);
            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload: response.data
            })   

            //Get the user
            userAuthenticated();
           // console.log(response.response);
        } catch (error) {
            console.log(error.response.data.msg);
            const alert= {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })            
        }
    }

    //Close session of user
    const closeSession = () => {
        dispatch({
            type: CLOSE_SESSION
        })
    }


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                msg: state.msg,
                loading: state.loading,
                registerUser,
                initSession,
                userAuthenticated,
                closeSession
            }}
        > 
            {props.children}
        </AuthContext.Provider>
    ); 
 
}

export default AuthState;