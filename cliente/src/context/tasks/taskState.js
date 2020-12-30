import React, {useReducer} from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import { v4 as uuidv4 } from 'uuid';
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

const TaskState = props => {
    const initialState = {
        tasks: [
            {id: 1,name:'Select Platform', state: true, projectId: 1},
            {id: 2,name:'Select Colours', state: false, projectId: 2},
            {id: 3,name:'Select Platform Pay', state: false, projectId: 3},
            {id: 4,name:'Select Hosting', state: true, projectId: 4},
            {id: 5,name:'Select Platform', state: true, projectId: 4},
            {id: 6,name:'Select Colours', state: false, projectId: 3},
            {id: 7,name:'Select Platform Pay', state: false, projectId: 2},
            {id: 8,name:'Select Hosting', state: true, projectId: 2}
        ],
        tasksproject:null,
        taskerror: false,
        taskselected: null
    }
    //create State and Reducer 
    const [state, dispatch] = useReducer(TaskReducer,initialState);
    
    //Create functions

    //Get tasks of one project
    const getTasks = projectId => {
        dispatch({
            type: TASKS_PROJECT,
            payload: projectId
        })
    }

    //add task to project selected
    const addTask = task => {
        task.id = uuidv4();
        dispatch({
            type: ADD_TASK,
            payload: task
        })
    }

    //validate and show error in form
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }
    
    const deleteTask = taskId => {
        dispatch({
            type: DELETE_TASK,
            payload: taskId
        })
    }

    //Change the state of task
    const changeStateTask = task => {
        dispatch({
            type: STATE_TASK,
            payload: task
        })
    }

    //Extract task from edition
    const saveTaskCurrent = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    //Extract task from edition
    const saveTaskUpdate = task => {
        dispatch({
            type: UPDATE_TASK,
            payload: task
        })
    }
    //Delete task selected
    const clearTask = () => {
        dispatch({
            type: CLEAR_TASK,
        })
    }

    return (
        //Para pasar al context
        <TaskContext.Provider
            value={{
                tasks:state.tasks,
                tasksproject: state.tasksproject,
                taskerror: state.taskerror,
                taskselected: state.taskselected,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                changeStateTask,
                saveTaskCurrent,
                saveTaskUpdate,
                clearTask
            }}
        >
            {props.children}
        </TaskContext.Provider>

    )
}

export default TaskState;