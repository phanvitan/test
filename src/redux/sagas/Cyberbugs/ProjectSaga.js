import { call, delay, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { history } from "../../../util/history";
import {
  CLOSE_DRAWER,
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_SAGA,
  GET_PROJECT_DETAIL,
  GET_USER_BY_PROJECT_ID_SAGA,
  PUT_PROJECT_DETAIL,
  UPDATE_PROJECT_SAGA,
} from "../../constants/Cyberbugs/Cyberbugs";
import { projectService } from "../../../services/ProjectService";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";

function* createProjectSaga(action) {
  console.log(action);
  //HIEN THI LOADING
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  //   console.log("actionSaga", action);
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.createProjectAuthorization(action.newProject)
    );

    ///goi api thanh cong thi dispatch len reducer thong qua put
    if (status === STATUS_CODE.SUCCESS) {
      history.push("/projectmanagement");
    }
    console.log("data", data);
  } catch (error) {
    console.log(error.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

/**  saga dung de get all project tu api
 * PHAN TAN code ngay : 22/12/2021
 */

function* getListProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getListProject()
    );
    //sau khi lay du lieu tu api ve thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_LIST_PROJECT,
        projectList: data.content,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* theoDoiGetListProjectSaga() {
  yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}

/***update project */
function* updateProjectSaga(action) {
  console.log("action123", action);
  //HIEN THI LOADING
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  //   console.log("actionSaga", action);
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.updateProject(action.projectUpdate)
    );

    ///goi api thanh cong thi dispatch len reducer thong qua put
    if (status === STATUS_CODE.SUCCESS) {
      // history.push("/projectmanagement");
      console.log("data", data);
      ///cach 1 : thong dung
      yield put({ type: GET_LIST_PROJECT_SAGA });
      ///cach 2 : khong thông dụng
      // yield call(getListProjectSaga);

      yield put({ type: CLOSE_DRAWER });
    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiUpdateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}

/*** delete project */
function* deleteProjectSaga(action) {
  console.log("action123", action);
  //HIEN THI LOADING
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  //   console.log("actionSaga", action);
  try {
    const { data, status } = yield call(() =>
      projectService.deleteProject(action.idProject)
    );

    ///goi api thanh cong thi dispatch len reducer thong qua put
    if (status === STATUS_CODE.SUCCESS) {
      // history.push("/projectmanagement");
      console.log("data", data);

      notifiFunction("success", "Delete project successfully!");
    } else {
      notifiFunction("error", "Delete project fail!");
    }
    ///cach 1 : thong dung
    yield put({ type: GET_LIST_PROJECT_SAGA });
    ///cach 2 : khong thông dụng
    // yield call(getListProjectSaga);

    yield put({ type: CLOSE_DRAWER });
  } catch (error) {
    notifiFunction("error", "Delete project fail!");
    console.log(error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

/*** get project detail */
function* getProjectDetailSaga(action) {
  console.log("action123", action);
  //HIEN THI LOADING
  // yield put({
  //   type: DISPLAY_LOADING,
  // });
  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      projectService.getProjectDetail(action.projectId)
    );
    console.log("data", data);
    //lay du lieu thanh cong thi dua du lieu len redux
    yield put({
      type: PUT_PROJECT_DETAIL,
      projectDetail: data.content,
    });
  } catch (error) {
    console.log("404 not found !");
    history.push("/projectmanagement");
  }
  // yield put({
  //   type: HIDE_LOADING,
  // });
}

export function* theoDoiGetProjectDetail() {
  yield takeLatest(GET_PROJECT_DETAIL, getProjectDetailSaga);
}

/**  saga dung de get all project tu api
 *
 */

function* getProjectAllSaga(action) {
  yield put({
    type: DISPLAY_LOADING
  });
  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      projectService.getAllProject()
    );
    //sau khi lay du lieu tu api ve thanh cong

    yield put({
      type: GET_ALL_PROJECT,
      arrProject: data.content
    });
    yield put({
      type:GET_USER_BY_PROJECT_ID_SAGA,
      idProject:data.content[0].id
    })
  } catch (error) {
    console.log(error.response.data);
    history.push('/projectmanagement');
  }
  yield put({
    type:HIDE_LOADING
  })
}

export function* theoDoiGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getProjectAllSaga);
}
