import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"
const GET_PIZZERIAS_URL = BASE_URL.concat('/pizzerias')
const GET_AVAILABLE_PIZZAS = BASE_URL.concat('/pizzerias/{}/pizzas')
const GET_FILTERED_PIZZAS = BASE_URL.concat('/pizzerias/{}/pizzas-with-ingredients')
const GET_INGREDIENTS = BASE_URL.concat('/ingredients')
const GET_FOUND_PIZZAS = BASE_URL.concat('/pizzerias/{}/pizzas-by-name')
const GET_FOUND_PIZZERIAS = BASE_URL.concat('/pizzerias-by-address')
const GET_ORDER_INFO = BASE_URL.concat('/orders/queue-position')
const AUTHENTICATE_USER = BASE_URL.concat('/users/login')
const MAKE_ORDER = BASE_URL.concat('/pizzerias/{}/orders')


String.prototype.format = function () {
    let i = 0, args = arguments;
    return this.replace(/{}/g, function () {
        return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};

function getToken() {
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
    return axios.get(GET_PIZZERIAS_URL);
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
    console.log(customers_phone_number);
    return axios.post(MAKE_ORDER.format(pizzeria_id), {
        customers_phone_number: customers_phone_number,
        delivery_address: delivery_address,
        total_price: total_price,
        choices: choices
    })
}
