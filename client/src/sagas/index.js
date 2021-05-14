import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
    authenticateUserService,
    fetchAllPizzeriasService,
    fetchAvailablePizzasService,
    fetchFilteredPizzasService,
    fetchFoundPizzasService,
    fetchFoundPizzeriasService,
    fetchIngredientsService,
    fetchMakeOrderService,
    fetchOrderInfoService
} from "../services";
import {
    GET_AVAILABLE_PIZZAS,
    GET_FILTERED_PIZZAS,
    GET_FOUND_PIZZAS,
    GET_FOUND_PIZZERIAS,
    GET_INGREDIENTS,
    GET_PIZZERIAS,
    GET_ORDER_INFO,
    AUTHENTICATE_USER,
    MAKE_ORDER
} from "../actions";
import {
    setPizzas,
    setPizzerias,
    setIngredients,
    endPizzaLoading,
    startPizzaLoading
} from "../actions";
import {formatChoices} from "../utils";


function* authenticateUser(action) {
    try {
        const response = yield call(
            authenticateUserService,
            action.payload.name,
            action.payload.password,
            action.payload.role,
        );

        if (response.status === 200) {
            const { data } = response;
            const { token } = data;
            localStorage.setItem('token', token);

            if(action.payload.role === "operator")
            {
                window.location.href = '/operator';
            }
            else if(action.payload.role === "admin")
            {
                window.location.href = '/admin';
            }

        }
    } catch (e) {}
}

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

function* fetchMakeOrder(action)
{
    try {
        const {data} = yield call(
            fetchMakeOrderService,
            action.payload.pizzeria_id,
            action.payload.customers_phone_number,
            action.payload.delivery_address,
            action.payload.total_price,
            formatChoices(action.payload.order)
        )

        console.log(data);
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

function* watchUserAuthenticate()
{
    yield takeEvery(AUTHENTICATE_USER, authenticateUser);
}

function* watchFetchMakeOrder()
{
    yield takeEvery(MAKE_ORDER, fetchMakeOrder);
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
        watchFetchOrderInfo(),
        watchFetchMakeOrder(),
        watchUserAuthenticate()
    ])
}
