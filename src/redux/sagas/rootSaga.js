import { all, call } from "redux-saga/effects";
import * as ToDoListSaga from "./ToDoListSaga";
import * as Cyberbugs from "./Cyberbugs/UserCyberbugsSaga";
import * as ProjectCategorySaga from "./Cyberbugs/ProjectCategorySaga";
import * as ProjectSaga from "./Cyberbugs/ProjectSaga";
import * as TaskTypeSaga from './Cyberbugs/TaskTypeSaga';
import * as TaskSaga from './Cyberbugs/TaskSaga';
import * as PrioritySaga from './Cyberbugs/PrioritySaga';
import * as StatusSaga from './Cyberbugs/StatusSaga';
// import * as StatusSaga from './Cyberbugs/StatusSaga';


export function* rootSaga() {
  yield all([
    // theo doi cac action saga todolist
    ToDoListSaga.theoDoiActionGetTaskApi(),
    ToDoListSaga.theoDoiActionAddTaskApi(),
    ToDoListSaga.theoDoiActionDeleteTaskApi(),
    ToDoListSaga.theoDoiDoneTask(),
    //nghiep vu cyberbugs
    Cyberbugs.theoDoiSignin(),
    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiGetUserByProjectIdSaga(),
    Cyberbugs.theoDoiAddUserProject(),
    Cyberbugs.theoDoiRemoveUserProject(),
    ProjectCategorySaga.theoDoigetAllProjectCategory(),
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiGetAllProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProjectSaga(),
    ProjectSaga.theoDoiGetProjectDetail(),
    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
    
    PrioritySaga.theoDoiGetAllPriority(),
    StatusSaga.theoDoiGetAllStatusSaga(),

    TaskSaga.theoDoiCreateTaskSaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiUpdateTaskStatusSaga(),
    TaskSaga.theoDoiHandleChangePostApi(),
    TaskSaga.theoDoiUpdateTaskSaga(),
  ]);
}
