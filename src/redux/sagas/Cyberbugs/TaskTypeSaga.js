import { call, put, takeLatest } from "redux-saga/effects";
import { taskTypeService } from "../../../services/TaskTypeService";
import {
  GET_ALL_TASK_TYPE,
  GET_ALL_TASK_TYPE_SAGA,
} from "../../constants/Cyberbugs/Cyberbugs";

function* getAllTaskTypeSaga(action) {
  try {
    const { data, status } = yield call(() => taskTypeService.getAllTaskType());
    yield put({
      type: GET_ALL_TASK_TYPE,
      arrTaskType: data.content,
    });
  } catch (error) {
    console.log(error);
  }
}
export function* theoDoiGetAllTaskTypeSaga() {
  yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga);
}
