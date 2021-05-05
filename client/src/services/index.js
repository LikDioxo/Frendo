import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000"
// const API_URL = BASE_URL.concat('api/');

const GET_PIZZERIAS_URL =  BASE_URL.concat('/pizzerias')





export function fetchAllPizzeriasService()
{
    return axios.get(GET_PIZZERIAS_URL);
}

// export function getPizzeriaWorkloadService(pizzeria_id)
// {
//     return axios.get(GET_PIZZERIA_WORKLOAD_URL,
//         {
//             pizzeria_id: pizzeria_id
//         }
//         );
// }





