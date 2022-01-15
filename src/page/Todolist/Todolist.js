import React, { Component } from 'react';
import Axios from 'axios';
import style from './Todolist.css';
import imgtdl from './bg.png'

export default class Todolist extends Component {

    state = {
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    }

    getTaskList = () => {
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        });
        promise.then((result) => {
            console.log(result.data);
            //neu goi api ley ve ket qua thanh cong thi set lai state cua component
            this.setState({
                taskList: result.data
            })
            console.log('thanh cong');
        });
        promise.catch((err) => {
            console.log(err.response.data);
            console.log('thatbai');
        });
    }

    renderTaskToDo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {
            return (
                <li key={index}>
                    <span>{item.taskName}</span>
                    <div className="buttons">
                        <button className="remove" type="button" onClick={() => {
                            this.delTask(item.taskName)
                        }}>
                            <i className="fa fa-trash-alt" />
                        </button>
                        <button type='button' className="complete" onClick={() => {
                            this.checkTask(item.taskName)
                        }}>
                            <i className="far fa-check-circle" />
                            <i className="fas fa-check-circle" />
                        </button>
                    </div>
                </li>
            )
        })
    }
    renderTaskToDoDone = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {
            return (
                <li key={index}>
                    <span>{item.taskName}</span>
                    <div className="buttons">
                        <button className="remove" type="button" onClick={() => {
                            this.delTask(item.taskName)
                        }}>
                            <i className="fa fa-trash-alt" />
                        </button>
                        <button type='button' className="complete" onClick={() => {
                            this.rejectTask(item.taskName)
                        }}>
                            <i className="fas fa-undo" />
                        </button>
                    </div>
                </li>
            )
        })
    }

    //xu ly reject task
    rejectTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then(res => {
            alert(res.data);
            this.getTaskList();
        });
        promise.catch(err => {
            alert(err.response.data);
        })
    }

    //xu ly done task
    checkTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then(res => {
            alert(res.data);
            this.getTaskList();
        });
        promise.catch(err => {
            alert(err.response.data);
        })
    }

    //ham xu ly xoa task
    delTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });
        promise.then(result => {
            alert(result.data);
            this.getTaskList();
        });
        promise.catch(errors => {
            alert(errors.response.data);
        })

    }

    //hàm sẽ tự động thực thi sau khi nội dung component được render
    componentDidMount() {
        this.getTaskList();
    }

    handleChange = (e) => {
        let { value, name } = e.target;
        console.log(value, name);
        let newValues = { ...this.state.values };
        newValues = { ...newValues, [name]: value };
        let newErrors = { ...this.state.errors };
        let regexString = /^[a-z A-Z]+$/;
        if (!regexString.test(value) || value.trim() === '') {
            newErrors[name] = name + ' invalid!';
        } else {
            newErrors[name] = '';
        }
        // newErrors = { ...newErrors, [name]: value.trim() === "" };
        this.setState({
            ...this.state,
            values: newValues,
            errors: newErrors
        })
    }

    addTask = (e) => {
        e.preventDefault(); //dung su kien submit form
        console.log(this.state.values.taskName);
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: this.state.values.taskName }
        });
        //xu ly thanh cong
        promise.then(result => {
            // alert(result.data);
            this.getTaskList();
        })
        //xu ly that bai
        promise.catch(errors => {
            alert(errors.response.data)
        })
    }

    render() {
        return (
            <form onSubmit={this.addTask}>
                {/* <button onClick={() => {
                    this.getTaskList()
                }}>Get task list</button> */}
                <div className="card">
                    <div className="card__header">
                        <img src={imgtdl}/>
                    </div>
                    {/* <h2>hello!</h2> */}
                    <div className="card__body">
                        <div className="card__content">
                            <div className="form-group">
                                <div className="card__title">
                                    <h2>My Tasks</h2>
                                    <p>September 9,2020</p>
                                </div>
                                <div className="card__add">
                                    <input name='taskName' onChange={this.handleChange} id="newTask" type="text" placeholder="Enter an activity..." />
                                    <button id="addItem" onClick={this.addTask}>
                                        <i className="fa fa-plus" />
                                    </button>
                                    {/* <p className='text text-danger'>{this.state.errors.taskName}</p> */}
                                </div>
                                <span className='text text-danger'>{this.state.errors.taskName}</span>
                            </div>
                            <div className="card__todo form-group">
                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">
                                    {this.renderTaskToDo()}
                                </ul>
                                {/* Completed tasks */}
                                <ul className="todo" id="completed">
                                    {this.renderTaskToDoDone()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

