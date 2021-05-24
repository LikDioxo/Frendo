import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
    authenticateUserService,
    fetchAllPizzeriasService,
    fetchAvailablePizzasService,
    fetchFilteredPizzasService,
    fetchFoundPizzasService,
    fetchFoundPizzeriasService,
    fetchGetPizzasByAdminService,
    fetchGetPizzeriaByOperatorService,
    fetchGetPizzeriaPizzasByOperatorService,
    fetchGetUsersByAdminService,
    fetchIngredientsService,
    fetchMakeOrderService,
    fetchOrderInfoService,
    fetchOrdersForPizzeriaService,
    fetchUpdatePizzeriaAvailablePizzaService,
    fetchUpdatePizzeriaOrderStatusService
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
    GET_PIZZERIA_PIZZAS_BY_OPERATOR,
    GET_ORDERS_FOR_PIZZERIA,
    UPDATE_PIZZERIA_AVAILABLE_PIZZAS,
    UPDATE_PIZZERIA_ORDER_STATUS,
    GET_ENTITIES
} from "../actions";
import {
    setPizzas,
    setPizzerias,
    setIngredients,
    endPizzaLoading,
    startPizzaLoading,
    setCurrentUser,
    setOperatorPizzeria,
    setOrdersForPizzeria,
    addToast,
    clearCart,
    flipOrderSubmitModalView,
    flipUpdateAvailablePizzasModalView,
    flipOrderHelpModalView,
    setEntities
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
            let user = {
                user_id: user_id,
                user_role: action.payload.role,
                username: action.payload.name
            }
            yield put(setCurrentUser(user));

            if (user_role === "ROLE_OPERATOR") {
                action.payload.history.push('/operator');
            }
            else if (user_role === "ROLE_ADMIN") {
                action.payload.history.push('/admin');
            }

            yield put(endPizzaLoading())
            yield put(addToast("success","Аутентификация прошла успешно :)"))
        }

    } catch (e) {
        yield put(endPizzaLoading())
        yield put(addToast("error","Ошибка: некоректные данные :("))
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

    }catch (e) {
        yield put(endPizzaLoading())
    }
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

    }catch (e) {
        yield put(endPizzaLoading())
    }
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

    }catch (e) {
        yield put(endPizzaLoading())
    }
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
        yield put(startPizzaLoading());

        const {data} = yield call(
            fetchOrderInfoService,
            action.payload.phone_number
        )
        yield put(endPizzaLoading())
        yield put(flipOrderHelpModalView())
        yield put(addToast("success", "Результат отправлен на ваш номер телефона :)"));
    }catch (e) {
        yield put(addToast("error", "Ошибка. Неверно введен номер телефона :("));
        yield put(endPizzaLoading())
    }
}

function* fetchMakeOrder(action)
{
    let response = null
    try {
        yield put(startPizzaLoading());

        response = yield call(
            fetchMakeOrderService,
            action.payload.pizzeria_id,
            action.payload.customers_phone_number,
            action.payload.delivery_address,
            action.payload.total_price,
            formatChoices(action.payload.order)
        )
        if(response.status === 201)
        {
            yield put(clearCart());
            yield put(endPizzaLoading());
            yield put(flipOrderSubmitModalView());
            yield put(addToast("success", "Заказ принят :)"));
        }
    }catch (e) {
        yield put(addToast("error", "Ошибка. Неверно введен номер телефона :("));
        yield put(endPizzaLoading());
    }
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

function* fetchOrdersForPizzeria(action)
{
    try {
        let token = localStorage.getItem('token')

        const {data} = yield call(
            fetchOrdersForPizzeriaService,
            action.payload.operator_id,
            token
        );

        yield put(setOrdersForPizzeria(data));
    }catch (e) {}

}

function* fetchUpdatePizzeriaAvailablePizzas(action)
{
    try {
        yield put(flipUpdateAvailablePizzasModalView())
        yield put(startPizzaLoading());
        let token = localStorage.getItem('token')

        for (let pizza of action.payload.pizzas) {
            const response = yield call(
                fetchUpdatePizzeriaAvailablePizzaService,
                action.payload.operator_id,
                token,
                pizza.id,
                pizza.is_available
            )
        }
        yield put(endPizzaLoading());
        yield put(addToast("success", "Данные успешно обновлены :)"));

    }catch (e) {
        yield put(addToast('error', "Ошибка: некоректные данные :("));
    }
}

function* fetchGetPizzeriaPizzasByOperator(action)
{
    try {
        yield put(startPizzaLoading());
        let token = localStorage.getItem('token');
        const response = yield call(
            fetchGetPizzeriaPizzasByOperatorService,
            action.payload.operator_id,
            token
        )
        if (response.status === 200) {
            const { data } = response;

            let pizzas = {};
            for (let pizza of data) {
                pizzas[pizza.id] = {
                    id: pizza.id,
                    pizza_name: pizza.pizza_name,
                    is_available:  pizza.is_available
                }
            }

            yield put(setPizzas(pizzas));
        }
        yield put(endPizzaLoading());

    }catch (e) {
        yield put(endPizzaLoading());
    }
}

function* fetchUpdatePizzeriaOrderStatus(action)
{
    try {
        yield put(startPizzaLoading());
        let token = localStorage.getItem('token');

        const response = yield call(
            fetchUpdatePizzeriaOrderStatusService,
            action.payload.operator_id,
            token,
            action.payload.order_id,
            action.payload.status
        )

        if (response.status === 200) {
            yield put(endPizzaLoading());
            yield put(flipUpdateAvailablePizzasModalView());
            yield put(addToast("success", "Данные успешно обновлены :)"));
        }
    }catch (e) {
        yield put(endPizzaLoading());
        yield put(addToast("error", "Ошибка: некоректные данные :("));
        yield put(flipUpdateAvailablePizzasModalView());
    }
}

function* fetchGetEntities(action)
{
    try {
        console.log(action)
        let token = localStorage.getItem('token');
        let response;

        if (action.payload.entity_type === 'ingredients') {
            response = yield call(
                fetchIngredientsService
            )
        }
        else if (action.payload.entity_type === 'pizzas') {
            response = yield call(
                fetchGetPizzasByAdminService,
                token
            )
        }
        else if (action.payload.entity_type === 'pizzerias') {
            response = yield call(
                fetchAllPizzeriasService
            )
        }
        else if (action.payload.entity_type === 'users') {
            response = yield call(
                fetchGetUsersByAdminService,
                token
            )
        }

        if (response === undefined) {
            yield put(addToast("error", "Сущность не опознана :("));
        }

        if (response.status === 200) {
            yield put(setEntities(response.data))
        }

    }catch (e) {
        yield put(addToast("error", "Что то пошло не так при обработке запроса :("));
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

function* watchFetchOrdersForPizzeria()
{
    yield takeEvery(GET_ORDERS_FOR_PIZZERIA, fetchOrdersForPizzeria);
}

function* watchFetchGetPizzeriaPizzasByOperator()
{
    yield takeEvery(GET_PIZZERIA_PIZZAS_BY_OPERATOR, fetchGetPizzeriaPizzasByOperator);
}

function* watchFetchUpdatePizzeriaAvailablePizzas()
{
    yield takeEvery(UPDATE_PIZZERIA_AVAILABLE_PIZZAS, fetchUpdatePizzeriaAvailablePizzas);
}

function* watchUpdatePizzeriaOrderStatus()
{
    yield takeEvery(UPDATE_PIZZERIA_ORDER_STATUS, fetchUpdatePizzeriaOrderStatus)
}

function* watchGetEntities()
{
    yield takeEvery(GET_ENTITIES, fetchGetEntities)
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
        watchFetchGetPizzeriaPizzasByOperator(),
        watchFetchOrdersForPizzeria(),
        watchFetchUpdatePizzeriaAvailablePizzas(),
        watchUpdatePizzeriaOrderStatus(),
        watchGetEntities()
    ])
}
