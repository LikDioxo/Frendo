import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
    authenticateUserService,
    fetchAllPizzeriasService,
    fetchAvailablePizzasService,
    fetchFilteredPizzasService,
    fetchFoundPizzasService,
    fetchFoundPizzeriasService,
    fetchGetPizzeriaByOperatorService,
    fetchGetPizzeriaPizzasByOperatorService,
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
    MAKE_ORDER,
    GET_PIZZERIA_BY_OPERATOR,
    GET_PIZZERIA_PIZZAS_BY_OPERATOR
} from "../actions";
import {
    setPizzas,
    setPizzerias,
    setIngredients,
    endPizzaLoading,
    startPizzaLoading,
    setCurrentUser,
    setOperatorPizzeria
} from "../actions";
import {formatChoices} from "../utils";


function* authenticateUser(action) {
    try {
        yield put(startPizzaLoading())
        const response = yield call(
            authenticateUserService,
            action.payload.name,
            action.payload.password,
            action.payload.role,
        );

        if (response.status === 200) {
            const { data } = response;
            const { token, user_id, user_role } = data;

            localStorage.setItem('token', token);
            yield put(setCurrentUser({user_id, user_role}));

            if (user_role === "ROLE_OPERATOR") {
                action.payload.history.push('/operator');
            }
            else if (user_role === "ROLE_ADMIN") {
                action.payload.history.push('/admin');
            }
        }
        yield put(endPizzaLoading())

    } catch (e) {
        yield put(endPizzaLoading())
    }
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

    }catch (e) {
        yield put(endPizzaLoading())
    }
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

    }catch (e) {}
}

function* fetchGetPizzeriaByOperator(action)
{
    try {
        let token = localStorage.getItem('token')

        const response = yield call(
            fetchGetPizzeriaByOperatorService,
            action.payload.operator_id,
            token
        )
        if (response.status === 200) {
            const { data } = response;
            const { id, address, workload } = data;

            yield put(setOperatorPizzeria(id, address, workload));
        }

    }catch (e) {}
}

function* fetchGetPizzeriaPizzasByOperator(action)
{
    try {
        let token = localStorage.getItem('token')

        const response = yield call(
            fetchGetPizzeriaPizzasByOperatorService,
            action.payload.operator_id,
            token
        )
        if (response.status === 200) {
            const { data } = response;

            yield put(setPizzas(data));
        }

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

function* watchFetchGetPizzeriaByOperator()
{
    yield takeEvery(GET_PIZZERIA_BY_OPERATOR, fetchGetPizzeriaByOperator);
}

function* watchFetchGetPizzeriaPizzasByOperator()
{
    yield takeEvery(GET_PIZZERIA_PIZZAS_BY_OPERATOR, fetchGetPizzeriaPizzasByOperator);
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
        watchUserAuthenticate(),
        watchFetchGetPizzeriaByOperator(),
        watchFetchGetPizzeriaPizzasByOperator()
    ])
}
