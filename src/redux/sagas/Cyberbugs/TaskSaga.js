import { call, put, select, takeLatest } from "redux-saga/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  CLOSE_DRAWER,
  CREATE_TASK_SAGA,
  GET_PROJECT_DETAIL,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_ASSIGNESS,
  UPDATE_STATUS_TASK_SAGA,
  UPDATE_TASK_SAGA,
} from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

function* createTaskSaga(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    const { data, status } = yield call(() =>
      taskService.createTask(action.taskObject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
    }
    yield put({
      type: CLOSE_DRAWER,
    });
    notifiFunction("success", "Create Task successfully!");
  } catch (error) {
    console.log(error.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

function* getTaskDetailSaga(action) {
  const { taskId } = action;
  try {
    const { data, status } = yield call(() =>
      taskService.getTaskDetail(taskId)
    );

    yield put({
      type: GET_TASK_DETAIL,
      taskDetailModal: data.content,
    });
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
  }
}

export function* theoDoiGetTaskDetailSaga(action) {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

function* updateTaskStatusSaga(action) {
  const { taskUpdateStatus } = action;
  console.log(action);
  try {
    // cập nhật api status cho task hiện tại

    const { data, status } = yield call(() =>
      taskService.updateStatusTask(taskUpdateStatus)
    );

    //sau khi thành công thì gọi lại get project detail saga để sắp xếp lại thông tin các task
    console.log(data);
    if (status == STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL,
        projectId: taskUpdateStatus.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateStatus.taskId,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
  }
}

export function* theoDoiUpdateTaskStatusSaga() {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}

function* updateTaskSaga(action) {}

export function* theoDoiUpdateTaskSaga() {
  yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
}

export function* handleChangePostApi(action) {
  // console.log("abc", action);
  // goi action lam thay doi taskDetailModal
  const { value, name } = action;
  switch (action.actionType) {
    case CHANGE_TASK_MODAL: {
      yield put({
        type: CHANGE_TASK_MODAL,
        name,
        value,
      });
    };break;
    case CHANGE_ASSIGNESS: {
      const { userSelected } = action;
      yield put({
        type: CHANGE_ASSIGNESS,
        userSelected,
      });
    };break;
    case REMOVE_ASSIGNESS: {
      const { userId } = action;
      yield put({
        type: REMOVE_ASSIGNESS,
        userId,
      });
    };break;
  }

  //save qua api updateTaskSaga
  //lay du lieu tu state.taskDetailModal
  let { taskDetailModal } = yield select((state) => state.TaskReducer);
  console.log("taskdetailmodal sau khi thay doi", taskDetailModal);
  // bien doi du lieu state.taskdetailmodal thanh du lieu api can
  const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
    return user.id;
  });
  const taskUpdateApi = { ...taskDetailModal, listUserAsign };
  try {
    const { data, status } = yield call(() =>
    taskService.updateTask(taskUpdateApi)
  );
     if(status===STATUS_CODE.SUCCESS){
      yield put({
        type: GET_PROJECT_DETAIL,
        projectId: taskUpdateApi.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateApi.taskId,
      });
  }
  } catch (error) {
    console.log(error);
    console.log(error.response?.data)
  }

  
 
}

export function* theoDoiHandleChangePostApi() {
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi);
}
