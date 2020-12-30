import {
    FORM_PROJECT,
    GET_PROJECTS,
    ADD_PROJECT,
    ERROR_PROJECT,
    VALIDATE_FORM,
    SELECTED_PROJECT,
    DELETE_PROJECT
} from '../../types/Index';
export default(state, action) => {
    switch(action.type) {
        
        case FORM_PROJECT:
            return {
                ...state,
                form: true
            }
        case GET_PROJECTS:
            //console.log(action.payload);
            return {
                ...state,
                projects: action.payload
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload], //si se cambia el orden tambien lo hace cuando lo muestra
                form: false,
                errorform: false
            }
            //action.payload Es el nuevo proyecto
        case VALIDATE_FORM:
            return {
                ...state,
                errorform: true
            }
        case SELECTED_PROJECT:
            return {
                ...state,
                project: state.projects.filter(project => project._id === action.payload)
            }
        case DELETE_PROJECT: //3
            //Traeme los que no sean iguales al que le estoy haciendo click
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                project: null
            }
        case ERROR_PROJECT: 
            return {
                ...state,
                msg: action.payload
            }
        default: 
            return state;
    }
}
