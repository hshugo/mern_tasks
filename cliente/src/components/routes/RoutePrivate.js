import  React, {useContext, useEffect} from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext  from '../../context/authentication/authContext';

//HOC: hight order component, i want protect them, for example Projects
const RoutePrivate = ({component: Component, ...props }) => {

    //Extract the information of authentication
    const authContext = useContext(AuthContext);
    const {authenticated, loading, userAuthenticated} = authContext;

    useEffect(()=>{
        userAuthenticated()
        //Para que no cicle
        // eslint-disable-next-line
    },[]);
    return (
        <Route { ...props} render={props=>!authenticated && !loading?  (
            <Redirect to="/" />
        ):(
            <Component  {...props}/>
        ) }

        />
    );
}

export default RoutePrivate;