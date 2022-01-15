import { call, put, takeLatest } from "redux-saga/effects";
import { statusService } from "../../../services/StatusService";
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from "../../constants/Cyberbugs/Cyberbugs";

function * getAllStatusSaga(action) {
    try {
        const {data,status}=yield call(()=> statusService.getAllStatus());
        yield put({
            type:GET_ALL_STATUS,
            arrStatus:data.content
        })
        
    } catch (error) {
        console.log(error);
        console.log(error.response?.data)
    }
}
export function * theoDoiGetAllStatusSaga(){
    yield takeLatest(GET_ALL_STATUS_SAGA,getAllStatusSaga)

}