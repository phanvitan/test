import Axios from 'axios';
import { call, delay, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { toDoListService, ToDoListService } from '../../services/ToDoListService';
import { STATUS_CODE } from '../../util/constants/settingSystem';
import { addTaskApi } from '../actions/ToDoListAction';
import { DISPLAY_LOADING, HIDE_LOADING } from '../constants/LoadingConst';
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASKLIST_API, GET_TASK_API, REJECT_TASK_API } from '../constants/ToDoListConst';

/*
LAY DANH SACH TASK TU API
*/
function* getTaskApiAction(action) {
    // console.log('actionSaga', action)
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        let { data, status } = yield call(toDoListService.getTaskApi);
        yield delay(1000);
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_API,
                taskList: data
            });
        } else {
            console.log('error')
        }
    } catch (error) {
        console.log(error)
    }
    yield put({
        type: HIDE_LOADING
    })
    // console.log('result', result)
}

export function* theoDoiActionGetTaskApi() {
    yield takeLatest(GET_TASKLIST_API, getTaskApiAction)
}

/*
THEM TASK
*/
function* addTaskApiAction(action) {

    const { taskName } = action;

    //  * goi api
    try {
        const { data, status } = yield call(() => {
            return toDoListService.addTaskApi(taskName);
        })

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }

    } catch (error) {
        console.log(error)
    }

    //  * /
    //  * hien thi loading
    //  * thanh cong thi load lai task = cach goi  lai action saga load tasklist
    //  * 
    // */

}

export function* theoDoiActionAddTaskApi() {
    yield takeLatest(ADD_TASK_API, addTaskApiAction)
}

/*
XOA TASK
*/
function* deleteTaskApi(action) {
    const { taskName } = action;
    try {
        const { data, status } = yield call(() => {
            return toDoListService.deleteTaskApi(taskName);
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API,
            })
        }

    } catch (error) {
        console.log(error)
    }

}

export function* theoDoiActionDeleteTaskApi() {
    yield takeLatest(DELETE_TASK_API, deleteTaskApi)
}

/*
DONE TASK
*/
function* checkDoneTaskApi(action) {
    const { taskName } = action;
    try {
        const { data, status } = yield call(() => {
            return toDoListService.checkDoneTaskApi(taskName);
        });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API,
            })
        }
    } catch (error) {
        console.log(error);
    }

}

export function* theoDoiDoneTask() {
    yield takeLatest(CHECK_TASK_API, checkDoneTaskApi)
}

/**REJECT TASK */

function* rejectTaskApi(action) {
    const { taskName } = action;
    try {
        const {data,status} = yield call(() => {
            return toDoListService.rejectTaskApi(taskName);
        });
        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:REJECT_TASK_API
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}
export function* theoDoirejectTask(){
    yield takeLatest(REJECT_TASK_API,rejectTaskApi)
}