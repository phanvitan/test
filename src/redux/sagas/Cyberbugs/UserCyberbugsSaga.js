import Axios from "axios";
import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
  select,
} from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../util/constants/settingSystem";
import {
  ADD_USER_PROJECT_API,
  GET_LIST_PROJECT_SAGA,
  GET_USER_API,
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_SAGA,
  GET_USER_SEARCH,
  REMOVE_USER_PROJECT_API,
  USER_SIGNIN_API,
} from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { push } from "react-router-redux";
import { history } from "../../../util/history";
import { userService } from "../../../services/UserService";

//quan ly cac action saga
function* signinSaga(action) {
  // console.log(action);

  // yield put({
  //   type: DISPLAY_LOADING,
  // });
  // yield delay(500);
  //goi API
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.signinCyberBugs(action.userLogin)
    );
    ///LUU VAO LOCALSTORE KHI DANG NHAP THANH CONG
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: USER_LOGIN,
      userLogin: data.content,
    });

    // let history = yield select((state) => state.HistoryReducer.history);
    history.push("/home");
  } catch (error) {
    console.log(error.response.data);
  }
  // yield put({
  //   type: HIDE_LOADING,
  // });
}

export function* theoDoiSignin() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}

//GET USER - search
function* getUserSaga(action) {
  console.log("keyword", action.keyWord);
  try {
    const { data, status } = yield call(() =>
      userService.getUser(action.keyWord)
    );
    console.log("data", data);
    yield put({
      type: GET_USER_SEARCH,
      listUserSearch: data.content,
    });
    console.log("data", data);
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* theoDoiGetUser() {
  yield takeLatest(GET_USER_API, getUserSaga);
}
//ADD USER
function* addUserProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );
    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* theoDoiAddUserProject() {
  yield takeLatest(ADD_USER_PROJECT_API, addUserProjectSaga);
}

//REMOVE USER FROM PROJECT
function* removeUserProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.deleteUserFromProject(action.userProject)
    );
    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* theoDoiRemoveUserProject() {
  yield takeLatest(REMOVE_USER_PROJECT_API, removeUserProjectSaga);
}

function* getUserByProjectIdSaga(action) {
  const { idProject } = action;
  console.log('action',idProject);
  try {
    const { data, status } = yield call(() =>
      userService.getUserByProjectId(idProject)
    );
  console.log('checkdata',data);
    if (status === STATUS_CODE.SUCCESS) {
    
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    if(error.response?.data.statusCode === STATUS_CODE.NOT_FOUND){
      yield put({
        type:GET_USER_BY_PROJECT_ID,
        arrUser:[]
      })
    }
  }
}

export function* theoDoiGetUserByProjectIdSaga() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}
