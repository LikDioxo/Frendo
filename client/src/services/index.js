import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"
// const API_URL = BASE_URL.concat('api/');
//http://127.0.0.1:8000/pizzerias/1/pizzas
const GET_PIZZERIAS_URL = BASE_URL.concat('/pizzerias')
const GET_AVAILABLE_PIZZA = BASE_URL.concat('/pizzerias/{}/pizzas')


String.prototype.format = function () {
    let i = 0, args = arguments;
    return this.replace(/{}/g, function () {
        return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};




export function fetchAllPizzeriasService()
{
    return axios.get(GET_PIZZERIAS_URL);
}

export function fetchAvailablePizzasService(pizzeria_id)
{
    return axios.get(GET_AVAILABLE_PIZZA.format(pizzeria_id));
}


// export function getPizzeriaWorkloadService(pizzeria_id)
// {
//     return axios.get(GET_PIZZERIA_WORKLOAD_URL,
//         {
//             pizzeria_id: pizzeria_id
//         }
//         );
// }





