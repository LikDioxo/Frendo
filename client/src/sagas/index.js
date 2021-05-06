import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
    fetchAllPizzeriasService,
    fetchAvailablePizzasService,
    fetchFilteredPizzasService,
    fetchIngredientsService
} from "../services";
import {
    GET_AVAILABLE_PIZZAS, GET_FILTERED_PIZZAS,
    GET_INGREDIENTS,
    GET_PIZZERIAS
} from "../actions";
import {
    setPizzas,
    setPizzerias,
    setIngredients
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


        yield put(setPizzas(data))
    }catch (e) {

    }

}
function* fetchFilteredPizzas(action)
{
    try {

        const {data} = yield call(
            fetchFilteredPizzasService,
            action.payload.pizzeria_id,
            action.payload.ingredients
        )


        yield put(setPizzas(data))
    }catch (e) {

    }

}

function* fetchIngredients(action)
{
    try {

        const {data} = yield call(
            fetchIngredientsService
        )


        yield put(setIngredients(data))
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

function* watchFetchFilteredPizzas()
{
    yield takeEvery(GET_FILTERED_PIZZAS, fetchFilteredPizzas);
}

function* watchFetchIngredients()
{
    yield takeEvery(GET_INGREDIENTS, fetchIngredients);
}

export default function* rootSaga()
{
    yield all([
        watchFetchAllPizzerias(),
        watchFetchAvailablePizzas(),
        watchFetchIngredients(),
        watchFetchFilteredPizzas()
    ])

}

