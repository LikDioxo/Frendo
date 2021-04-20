import axios from "axios";


axios.defaults.baseURL = '127.0.0.1:80';


function getPizzeriaAvailablePizzas(pizzeria_id) {
    return axios(
        {
            method: 'get',
            url: '/api/get/pizzeria-pizzas',
            params: {
                pizzeria_id: pizzeria_id
            }
        }
    )
}
