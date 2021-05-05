import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
    fetchAllPizzeriasService
} from "../services";
import {
    GET_PIZZERIAS
} from "../actions";
import {
    setPizzerias
} from "../actions";


function* fetchAllPizzerias(action)
{
    try {
        const {data} = yield call(
            fetchAllPizzeriasService
        )


        yield put(setPizzerias(data))
    }catch (e) {

    }

}


function* watchFetchAllPizzerias()
{
    yield takeEvery(GET_PIZZERIAS, fetchAllPizzerias);
}


export default function* rootSaga()
{
    yield all([
        watchFetchAllPizzerias()
    ])

}

