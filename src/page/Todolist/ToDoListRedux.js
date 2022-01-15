import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTaskApi, checkTaskApi, deleteTaskApi, getTaskListApi, rejectTaskApi } from '../../redux/actions/ToDoListAction';
import { GET_TASK_API } from '../../redux/constants/ToDoListConst';
import img from './bg.png'


export default function ToDoListRedux(props) {
    //lay tasklist tu redux ve
    const { taskList } = useSelector(state => state.ToDoListReducer);
    const dispatch = useDispatch();

    let [state, setState] = useState({
        // taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    });

    console.log(state)
    const handleChange = (e) => {
        let { value, name } = e.target;
        console.log(value, name);
        let newValues = { ...state.values };
        newValues = { ...newValues, [name]: value };
        let newErrors = { ...state.errors };
        let regexString = /^[a-z A-Z]+$/;
        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = name + ' invalid!';
        } else {
            newErrors[name] = '';
        }
        // newErrors = { ...newErrors, [name]: value.trim() === "" };
        setState({
            ...state,
            values: newValues,
            errors: newErrors
        })
    }

    const getTaskList = () => {
        dispatch(getTaskListApi())
    }

    const addTask = (e) => {
        e.preventDefault(); ///chan su kien reload lai trang
        console.log(state.values.taskName);
        ///xu ly nhan du lieu tu nguoi dung nhap => goi action addTaskApi()
        dispatch(addTaskApi(state.values.taskName))
    }

    useEffect(() => {
        getTaskList();
        return () => {
        }
    }, [])

    //xu ly reject task
    const rejectTask = (taskName) => {
        dispatch(rejectTaskApi(taskName))
    }

    //xu ly done task
    const checkTask = (taskName) => {
        dispatch(checkTaskApi(taskName))
    }

    //ham xu ly xoa task
    const delTask = (taskName) => {
        dispatch(deleteTaskApi(taskName))

    }
    const renderTaskToDo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
            return (
                <li key={index}>
                    <span>{item.taskName}</span>
                    <div className="buttons">
                        <button className="remove" type="button" onClick={() => {
                            delTask(item.taskName)
                        }}>
                            <i className="fa fa-trash-alt" />
                        </button>
                        <button type='button' className="complete" onClick={() => {
                            checkTask(item.taskName)
                        }}>
                            <i className="far fa-check-circle" />
                            <i className="fas fa-check-circle" />
                        </button>
                    </div>
                </li>
            )
        })
    }
    const renderTaskToDoDone = () => {
        return taskList.filter(item => item.status).map((item, index) => {
            return (
                <li key={index}>
                    <span>{item.taskName}</span>
                    <div className="buttons">
                        <button className="remove" type="button" onClick={() => {
                            delTask(item.taskName)
                        }}>
                            <i className="fa fa-trash-alt" />
                        </button>
                        <button type='button' className="complete" onClick={() => {
                            rejectTask(item.taskName)
                        }}>
                            <i className="fas fa-undo" />
                        </button>
                    </div>
                </li>
            )
        })
    }


    return (
        <div className="card">
            <div className="card__header">
                <img src={img} alt={img} />
            </div>
            {/* <h2>hello!</h2> */}
            <form className="card__body" onSubmit={addTask}>
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>September 9,2020</p>
                    </div>
                    <div className="card__add">
                        <input name='taskName' id="newTask" type="text" placeholder="Enter an activity..." onChange={handleChange} />
                        <button id="addItem" type='submit' onClick={addTask}>
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <div className="card__todo">
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {renderTaskToDo()}
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                            {renderTaskToDoDone()}
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    )
}


