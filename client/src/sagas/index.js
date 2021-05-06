import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
    fetchAllPizzeriasService,
    fetchAvailablePizzasService
} from "../services";
import {
    GET_AVAILABLE_PIZZAS,
    GET_PIZZERIAS
} from "../actions";
import {
    setAvailablePizzas,
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

function* fetchAvailablePizzas(action)
{
    try {
        const {data} = yield call(
            fetchAvailablePizzasService,
            action.payload.pizzeria_id
        )


        yield put(setAvailablePizzas(data))
    }catch (e) {

    }

}



function* watchFetchAllPizzerias()
{
    yield takeEvery(GET_PIZZERIAS, fetchAllPizzerias);
}

function* watchFetchAvailablePizzas()
{
    yield takeEvery(GET_AVAILABLE_PIZZAS, fetchAvailablePizzas);
}


export default function* rootSaga()
{
    yield all([
        watchFetchAllPizzerias(),
        watchFetchAvailablePizzas()
    ])

}

