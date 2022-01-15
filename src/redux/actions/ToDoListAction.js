import Axios from "axios";
import { GET_TASK_API } from "../constants/ToDoListConst";

//action có 2 loại :
// loại thực thi ngay làm thay đổi reducer (action 1)
//và loại phải thực hiện xử lí rồi mới gọi action 1 thực thi (async action)

// export const getTaskListApi = () => {
//     //tien xu ly du lieu => xu ly function
//     return dispatch => {
//         let promise = Axios({
//             url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
//             method: 'GET'
//         });
//         promise.then((result) => {
//             console.log(result.data);
//             //neu goi api ley ve ket qua thanh cong thi set lai state cua component
//             // setState({
//             //     ...state,
//             //     taskList: result.data
//             // })
//             dispatch({
//                 type: GET_TASK_API,
//                 taskList: result.data
//             })
//             console.log('thanh cong');
//         });
//         promise.catch((err) => {
//             console.log(err.response.data);
//             console.log('thatbai');
//         });
//     }
// }

///cach code dung try catch va async await thay cho promise
export const getTaskListApi = () => {
    return async dispatch => {
        try {
            let { data, status, ...res } = await Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
                method: 'GET'
            });
            if (status === 200) {
                dispatch({
                    type: GET_TASK_API,
                    taskList: data
                })
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

///cach code dung promise thay cho try catch va async await

// export const addTaskApi = (taskName) => {
//     return dispatch => {
//         ///  xu ly truoc khi dispatch
//         let promise = Axios({
//             url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
//             method: 'POST',
//             data: { taskName: taskName }
//         });
//         //xu ly thanh cong
//         promise.then(result => {
//             // alert(result.data);
//             dispatch(getTaskListApi())
//         })
//         //xu ly that bai
//         promise.catch(errors => {
//             alert(errors.response.data)
//         })

//     }
// }

export const addTaskApi = (taskName) => {
    return async dispatch => {
        try {
            let { status, data } = await Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'POST',
                data: { taskName: taskName }
            })
            if(status===200){
                dispatch(getTaskListApi())
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

///cach code dung promise thay cho try catch va async await
export const deleteTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        });
        promise.then(result => {
            dispatch(getTaskListApi())
        });
        promise.catch(errors => {
            alert(errors.response.data);
        })
    }
}

export const checkTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then(res => {

            dispatch(getTaskListApi())
        });
        promise.catch(err => {
            alert(err.response.data);
        })
    }

}

export const rejectTaskApi = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then(res => {
            alert(res.data);
            dispatch(getTaskListApi())
        });
        promise.catch(err => {
            alert(err.response.data);
        })
    }
}