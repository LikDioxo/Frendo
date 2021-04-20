import axios from "axios";


axios.defaults.baseURL = "http://127.0.0.1:80"

export function getPizzeriaAvailablePizzas(pizzeria_id) {
    return axios.get('/api/get/pizzeria-pizzas?pizzeria_id=7');
}
