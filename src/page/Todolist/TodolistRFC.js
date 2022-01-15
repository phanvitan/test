import Axios from 'axios';
import React, { useEffect, useState } from 'react'
// import style from './Todolist.css'
import imgtdl from './bg.png'


export default function TodolistRFC(props) {

    let [state, setState] = useState({
        taskList: [],
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
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        });
        promise.then((result) => {
            console.log(result.data);
            //neu goi api ley ve ket qua thanh cong thi set lai state cua component
            setState({
                ...state,
                taskList: result.data
            })
            console.log('thanh cong');
        });
        promise.catch((err) => {
            console.log(err.response.data);
            console.log('thatbai');
        });
    }

    const addTask = (e) => {
        e.preventDefault(); ///chan su kien reload lai trang
        console.log(state.values.taskName);
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: state.values.taskName }
        });
        //xu ly thanh cong
        promise.then(result => {
            // alert(result.data);
            getTaskList();
        })
        //xu ly that bai
        promise.catch(errors => {
            alert(errors.response.data)
        })
    }

    useEffect(() => {
        getTaskList();
        return () => {
        }
    }, [])

    //xu ly reject task
    const rejectTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then(res => {
            alert(res.data);
            getTaskList();
        });
        promise.catch(err => {
            alert(err.response.data);
        })
    }

    //xu ly done task
    const checkTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then(res => {
            alert(res.data);
            getTaskList();
        });
        promise.catch(err => {
            alert(err.response.data);
        })
    }

    //ham xu ly xoa task
    const delTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });
        promise.then(result => {
            alert(result.data);
            getTaskList();
        });
        promise.catch(errors => {
            alert(errors.response.data);
        })

    }
    const renderTaskToDo = () => {
        return state.taskList.filter(item => !item.status).map((item, index) => {
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
        return state.taskList.filter(item => item.status).map((item, index) => {
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
                <img src={imgtdl}/>
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
