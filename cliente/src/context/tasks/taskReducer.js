import {
    TASKS_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    STATE_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAR_TASK
} from '../../types/Index';

export default (state, action) => {
    switch (action.type) {
        case TASKS_PROJECT:
            return {
                ...state,
                tasksproject: state.tasks.filter(task => task.projectId === action.payload)
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: [ action.payload,...state.tasks], //si se cambia el orden tambien lo hace cuando lo muestra
                taskerror:false
            };
        case VALIDATE_TASK:
            return {
                ...state,
                taskerror: true
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        case UPDATE_TASK:
        case STATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task ),
                //taskselected: null si quiero limpiar el form 
            };
       
        case CURRENT_TASK:
            return {
                ...state,
                taskselected: action.payload
            };
        case CLEAR_TASK:
            return {
                ...state,
                taskselected: null 
            };
        default:
            return state; 
    }
}