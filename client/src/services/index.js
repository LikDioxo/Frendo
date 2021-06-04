import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"
const GET_PIZZERIAS = BASE_URL.concat('/pizzerias')
const GET_AVAILABLE_PIZZAS = BASE_URL.concat('/pizzerias/{}/pizzas')
const GET_FILTERED_PIZZAS = BASE_URL.concat('/pizzerias/{}/pizzas-with-ingredients')
const GET_INGREDIENTS = BASE_URL.concat('/ingredients')
const GET_FOUND_PIZZAS = BASE_URL.concat('/pizzerias/{}/pizzas-by-name')
const GET_FOUND_PIZZERIAS = BASE_URL.concat('/pizzerias-by-address')
const GET_ORDER_INFO = BASE_URL.concat('/orders/queue-position')
const AUTHENTICATE_USER = BASE_URL.concat('/users/login')
const MAKE_ORDER = BASE_URL.concat('/pizzerias/{}/orders')
const GET_PIZZERIA_BY_OPERATOR = BASE_URL.concat('/operator/{}/pizzeria')
const GET_PIZZERIA_PIZZAS_BY_OPERATOR = BASE_URL.concat('/operator/{}/pizzeria/pizzas')
const GET_ORDERS_FOR_PIZZERIA = BASE_URL.concat('/operator/{}/pizzeria/orders')
const UPDATE_PIZZERIA_AVAILABLE_PIZZA = BASE_URL.concat('/operator/{}/pizzeria/pizzas/{}')
const UPDATE_PIZZERIA_ORDER_STATUS = BASE_URL.concat('/operator/{}/pizzeria/orders/{}/status')
const GET_USERS_BY_ADMIN = BASE_URL.concat('/admin/users')
const GET_PIZZAS_BY_ADMIN = BASE_URL.concat('/admin/pizzas')
// const GET_INGREDIENTS_BY_ADMIN = BASE_URL.concat('/admin/ingredients')
// const GET_USERS_BY_ADMIN = BASE_URL.concat('/admin/users')
const CREATE_INGREDIENT = BASE_URL.concat('/admin/ingredients')
const CREATE_PIZZA = BASE_URL.concat('/admin/pizzas')
const CREATE_PIZZERIA = BASE_URL.concat('/admin/pizzerias')
const CREATE_USER = BASE_URL.concat('/admin/users')
const SET_PIZZA_IMAGE = BASE_URL.concat('/admin/pizzas/{}/image')


String.prototype.format = function ()
{
    let i = 0, args = arguments;
    return this.replace(/{}/g, function () {
        return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};

export function getToken()
{
    return localStorage.getItem('token');
}

export function authenticateUserService(username, password, role)
{
    return axios.get(AUTHENTICATE_USER,{
            params: {
                username: username,
                password: password,
                role: role
            }
    });
}

export function fetchAllPizzeriasService()
{
    return axios.get(GET_PIZZERIAS);
}

export function fetchOrdersForPizzeriaService(operator_id, token)
{
    return axios({
        method: "GET",
        url:GET_ORDERS_FOR_PIZZERIA.format(operator_id),
        headers: {'Authorization': token}
    })
}

export function fetchAvailablePizzasService(pizzeria_id)
{
    return axios.get(GET_AVAILABLE_PIZZAS.format(pizzeria_id));
}

export function fetchFilteredPizzasService(pizzeria_id, ingredients)
{
    return axios.get(GET_FILTERED_PIZZAS.format(pizzeria_id), {
        params: {
            ingredients: ingredients
        }
    });
}

export function fetchFoundPizzasService(pizzeria_id, name)
{
    return axios.get(GET_FOUND_PIZZAS.format(pizzeria_id), {
        params: {
            name: name
        }
    })
}

export function fetchFoundPizzeriasService(address)
{
    return axios.get(GET_FOUND_PIZZERIAS, {
        params: {
            address: address
        }
    })
}

export function fetchIngredientsService()
{
    return axios.get(GET_INGREDIENTS);
}

export function fetchOrderInfoService(phone_number)
{
    return axios.get(GET_ORDER_INFO, {
        params: {
            phone_number: phone_number
        }
    });
}

export function fetchMakeOrderService(
    pizzeria_id,
    customers_phone_number,
    delivery_address,
    total_price,
    choices
)
{
    return axios.post(MAKE_ORDER.format(pizzeria_id), {
        customers_phone_number: customers_phone_number,
        delivery_address: delivery_address,
        total_price: total_price,
        choices: choices
    })
}

export function fetchGetPizzeriaByOperatorService(
    operator_id,
    operator_token
)
{
    return axios({
        method: 'get',
        url: GET_PIZZERIA_BY_OPERATOR.format(operator_id),
        headers: {'Authorization': operator_token}
    })
}

export function fetchGetPizzeriaPizzasByOperatorService(
    operator_id,
    operator_token
)
{
    return axios({
        method: 'get',
        url: GET_PIZZERIA_PIZZAS_BY_OPERATOR.format(operator_id),
        headers: {'Authorization': operator_token}
    })
}

export function fetchUpdatePizzeriaAvailablePizzaService(
    operator_id,
    operator_token,
    pizzeria_pizza_id,
    is_available
)
{
    return axios({
        method: 'put',
        url: UPDATE_PIZZERIA_AVAILABLE_PIZZA.format(operator_id, pizzeria_pizza_id),
        headers: {'Authorization': operator_token},
        data: {
            is_available: is_available
        }
    })
}

export function fetchUpdatePizzeriaOrderStatusService(
    operator_id,
    operator_token,
    order_id,
    status
)
{
    return axios({
        method: 'put',
        url: UPDATE_PIZZERIA_ORDER_STATUS.format(operator_id, order_id),
        headers: {'Authorization': operator_token},
        data: {
            status: parseInt(status)
        }
    })
}

export function fetchGetUsersByAdminService(
    admin_token
)
{
    return axios({
        method: 'get',
        url: GET_USERS_BY_ADMIN,
        headers: {'Authorization': admin_token}
    })
}

export function fetchGetPizzasByAdminService(
    admin_token
)
{
    return axios({
        method: 'get',
        url: GET_PIZZAS_BY_ADMIN,
        headers: {'Authorization': admin_token}
    })
}

export function fetchCreateIngredientService(
    admin_token,
    entity
)
{
    return axios({
        method: 'post',
        url: CREATE_INGREDIENT,
        headers: {'Authorization': admin_token},
        data: {
            name: entity.name,
            price: entity.price
        }
    })
}

export function fetchCreatePizzaService(
    admin_token,
    entity
)
{
    return axios({
        method: 'post',
        url: CREATE_PIZZA,
        headers: {'Authorization': admin_token},
        data: {
            name: entity.name,
            weight: entity.weight,
            size: entity.size,
            price: entity.price,
            ingredients: entity.ingredients
        }
    })
}

export function fetchCreatePizzeriaService(
    admin_token,
    entity
)
{
    return axios({
        method: 'post',
        url: CREATE_PIZZERIA,
        headers: {'Authorization': admin_token},
        data: {
            address: entity.address,
            operator_id: entity.operator_id
        }
    })
}

export function fetchCreateUserService(
    admin_token,
    entity
)
{
    return axios({
        method: 'post',
        url: CREATE_USER,
        headers: {'Authorization': admin_token},
        data: {
            username: entity.username,
            password: entity.password,
            roles: entity.roles
        }
    })
}

export function fetchSetPizzaImageService(
    admin_token,
    pizza_id,
    image
)
{
    let form = new FormData();
    form.append('image', image);
    form.append('test', "123");

    console.log(form);

    return axios({
        method: 'put',
        url: SET_PIZZA_IMAGE.format(pizza_id),
        headers: {
            'Authorization': admin_token,
            // 'Content-type': 'multipart/form-data',
        },
        data: form
    })
}

