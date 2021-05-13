import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
    fetchAllPizzeriasService,
    fetchAvailablePizzasService,
    fetchFilteredPizzasService,
    fetchFoundPizzasService, fetchFoundPizzeriasService,
    fetchIngredientsService, fetchOrderInfoService
} from "../services";
import {
    GET_AVAILABLE_PIZZAS,
    GET_FILTERED_PIZZAS,
    GET_FOUND_PIZZAS,
    GET_FOUND_PIZZERIAS,
    GET_INGREDIENTS,
    GET_PIZZERIAS,
    GET_ORDER_INFO
} from "../actions";
import {
    setPizzas,
    setPizzerias,
    setIngredients,
    endPizzaLoading,
    startPizzaLoading
} from "../actions";


function* fetchAllPizzerias(action)
{
    try {
        const {data} = yield call(
            fetchAllPizzeriasService
        )

        yield put(setPizzerias(data))

    }catch (e) {}
}

function* fetchAvailablePizzas(action)
{
    try {
        yield put(startPizzaLoading())
        const {data} = yield call(
            fetchAvailablePizzasService,
            action.payload.pizzeria_id
        )

        yield put(setPizzas(data))
        yield put(endPizzaLoading())
    }catch (e) {}
}

function* fetchFilteredPizzas(action)
{
    try {
        yield put(startPizzaLoading())
        const {data} = yield call(
            fetchFilteredPizzasService,
            action.payload.pizzeria_id,
            action.payload.ingredients
        )

        yield put(setPizzas(data))
        yield put(endPizzaLoading())
    }catch (e) {}
}

function* fetchFoundPizzas(action)
{
    try {
        yield put(startPizzaLoading())
        const {data} = yield call(
            fetchFoundPizzasService,
            action.payload.pizzeria_id,
            action.payload.name
        )

        yield put(setPizzas(data))
        yield put(endPizzaLoading())
    }catch (e) {}
}

function* fetchFoundPizzerias(action)
{
    try {
        yield put(startPizzaLoading())
        const {data} = yield call(
            fetchFoundPizzeriasService,
            action.payload.address
        )

        yield put(setPizzerias(data))
        yield put(endPizzaLoading())
    }catch (e) {}
}

function* fetchIngredients(action)
{
    try {
        const {data} = yield call(
            fetchIngredientsService
        )

        yield put(setIngredients(data))

    }catch (e) {}
}

function* fetchOrderInfo(action)
{
    try {
        const {data} = yield call(
            fetchOrderInfoService,
            action.payload.phone_number
        )

    }catch (e) {}
}


function* watchFetchAllPizzerias()
{
    yield takeEvery(GET_PIZZERIAS, fetchAllPizzerias);
}

function* watchFetchAvailablePizzas()
{
    yield takeEvery(GET_AVAILABLE_PIZZAS, fetchAvailablePizzas);
}

function* watchFetchFilteredPizzas()
{
    yield takeEvery(GET_FILTERED_PIZZAS, fetchFilteredPizzas);
}

function* watchFetchFoundPizzas()
{
    yield takeEvery(GET_FOUND_PIZZAS, fetchFoundPizzas);
}

function* watchFetchFoundPizzerias()
{
    yield takeEvery(GET_FOUND_PIZZERIAS, fetchFoundPizzerias);
}

function* watchFetchIngredients()
{
    yield takeEvery(GET_INGREDIENTS, fetchIngredients);
}

function* watchFetchOrderInfo()
{
    yield takeEvery(GET_ORDER_INFO, fetchOrderInfo);
}

export default function* rootSaga()
{
    yield all([
        watchFetchAllPizzerias(),
        watchFetchAvailablePizzas(),
        watchFetchIngredients(),
        watchFetchFilteredPizzas(),
        watchFetchFoundPizzas(),
        watchFetchFoundPizzerias(),
        watchFetchOrderInfo()
    ])
}
