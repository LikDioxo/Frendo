//Filter actions
export const VIEW_FILTER_BOX = "VIEW_FILTER_BOX"
export const SET_INGREDIENTS = "SET_INGREDIENTS"
export const GET_INGREDIENTS = "GET_INGREDIENTS"
export const FLIP_INGREDIENT_SELECTION = "FLIP_INGREDIENT_SELECTION"
export const RESET_INGREDIENT_SELECTION = "RESET_INGREDIENT_SELECTION"

//Order actions
export const ADD_PIZZA_TO_ORDER = "ADD_PIZZA_TO_ORDER"
export const SHOW_ORDER_HELP_MODAL = "SHOW_ORDER_HELP_MODAL"
export const GET_ORDER_INFO = "GET_ORDER_INFO"
export const SHOW_ORDER_SUBMIT_MODAL = "SHOW_ORDER_SUBMIT_MODAL"
export const MAKE_ORDER = "MAKE_ORDER"
export const SET_SELECTED_PIZZA = "SET_SELECTED_PIZZA"
export const CHANGE_PIZZA = "CHANGE_PIZZA"
export const CHANGE_PIZZA_IN_ORDER = "CHANGE_PIZZA_IN_ORDER"
export const UNSET_SELECTED_PIZZA = "UNSET_SELECTED_PIZZA"
export const UNSET_PIZZA_CHANGE = "UNSET_PIZZA_CHANGE"
export const INCREASE_SELECTED_PIZZA_QUANTITY = "INCREASE_SELECTED_PIZZA_QUANTITY"
export const DECREASE_SELECTED_PIZZA_QUANTITY = "DECREASE_SELECTED_PIZZA_QUANTITY"
export const DELETE_PIZZA_FROM_ORDER = "DELETE_PIZZA_FROM_ORDER"
export const CLEAR_CART = "CLEAR_CART"
export const CHANGE_INGREDIENT_IN_CART_PIZZA = "CHANGE_INGREDIENT_IN_CART_PIZZA"

//User actions
export const SET_OPERATOR_PIZZERIA = "SET_OPERATOR_PIZZERIA"
export const LOGOUT_USER = "LOGOUT_USER"
export const AUTHENTICATE_USER = "AUTHENTICATE_USER"
export const SET_CURRENT_USER = "SET_CURRENT_USER"

//Pizza actions
export const CHANGE_INGREDIENT_IN_SELECTED_PIZZA = "CHANGE_INGREDIENT_IN_SELECTED_PIZZA"
export const FLIP_PIZZA_SELECTION = "FLIP_PIZZA_SELECTION"
export const RESET_PIZZA_SELECTION = "RESET_PIZZA_SELECTION"
export const GET_FOUND_PIZZAS = "GET_FOUND_PIZZAS"
export const SET_PIZZAS = "SET_PIZZAS"
export const GET_AVAILABLE_PIZZAS = "GET_AVAILABLE_PIZZAS"
export const GET_FILTERED_PIZZAS = "GET_FILTERED_PIZZAS"

//Loading actions
export const START_PIZZA_LOADING = "START_PIZZA_LOADING"
export const END_PIZZA_LOADING = "END_PIZZA_LOADING"

//Pizzeria actions
export const GET_PIZZERIA_PIZZAS_BY_OPERATOR = "GET_PIZZERIA_PIZZAS_BY_OPERATOR"
export const UPDATE_PIZZERIA_AVAILABLE_PIZZAS = "UPDATE_PIZZERIA_AVAILABLE_PIZZAS"
export const GET_ORDERS_FOR_PIZZERIA = "GET_ORDERS_FOR_PIZZERIA"
export const SET_ORDERS_FOR_PIZZERIA = "SET_ORDERS_FOR_PIZZERIA"
export const GET_PIZZERIA_BY_OPERATOR = "GET_PIZZERIA_BY_OPERATOR"
export const GET_FOUND_PIZZERIAS = "GET_FOUND_PIZZERIAS"
export const SHOW_PIZZERIAS_MODAL = "SHOW_PIZZERIAS_MODAL"
export const SET_CHOSEN_PIZZERIA = "SET_CHOSEN_PIZZERIA"
export const SET_PIZZERIAS = "SET_PIZZERIAS"
export const GET_PIZZERIAS = "GET_PIZZERIA"
export const SET_DETAIL_ORDER= "SET_DETAIL_ORDER"

//Toast actions
export const ADD_TOAST = "ADD_TOAST"


export function setDetailOrder(order, history)
{
    return {
        type: SET_DETAIL_ORDER,
        payload: {order, history}
    }
}



export function getOrdersForPizzeria(operator_id)
{
    return {
        type: GET_ORDERS_FOR_PIZZERIA,
        payload: {operator_id}
    }
}

export function addToast(toastType, message) {
    return {
        type: ADD_TOAST,
        payload: { type: toastType, message }
    }
}



export function setOrdersForPizzeria(orders)
{
    return {
        type: SET_ORDERS_FOR_PIZZERIA,
        payload: {orders}
    }
}



export function authenticateUser(name, password, role, history)
{
    return {
        type: AUTHENTICATE_USER,
        payload: {
            name: name,
            password: password,
            role: role,
            history: history
        }
    }
}

export function setCurrentUser(user)
{
    return {
        type: SET_CURRENT_USER,
        payload: {user}
    }
}



export function startPizzaLoading()
{
    return {
        type: START_PIZZA_LOADING,
        payload: {}
    }
}

export function endPizzaLoading()
{
    return {
        type: END_PIZZA_LOADING,
        payload: {}
    }
}

export function flipFilterView()
{
    return {
        type: VIEW_FILTER_BOX,
        payload: {}
    }
}

export function flipPizzeriasModalView()
{
    return {
        type: SHOW_PIZZERIAS_MODAL,
        payload: {}
    }
}

export function getPizzerias()
{
    return{
        type: GET_PIZZERIAS,
        payload: {}
    }
}

export function clearCart()
{
    return{
        type: CLEAR_CART,
        payload: {}
    }
}

export function flipIngredientSelection(ingredient_id)
{
    return {
        type: FLIP_INGREDIENT_SELECTION,
        payload: {ingredient_id}
    }
}

export function resetIngredientSelection()
{
    return {
        type: RESET_INGREDIENT_SELECTION,
        payload: {}
    }
}

export function setPizzerias(pizzerias)
{
    return {
        type: SET_PIZZERIAS,
        payload: {pizzerias}
    }
}

export function getAvailablePizzas(pizzeria_id)
{
    return{
        type: GET_AVAILABLE_PIZZAS,
        payload: {
            pizzeria_id: pizzeria_id
        }
    }
}

export function getFilteredPizzas(pizzeria_id,ingredients)
{
    return{
        type: GET_FILTERED_PIZZAS,
        payload: {
            pizzeria_id: pizzeria_id,
            ingredients: ingredients
        }
    }
}

export function setPizzas(pizzas)
{
    return {
        type: SET_PIZZAS,
        payload: {pizzas}
    }
}

export function setSelectedPizza(pizza)
{
    return {
        type: SET_SELECTED_PIZZA,
        payload: {pizza}
    }
}

export function changePizzaInOrder(pizza_id)
{
    return {
        type: CHANGE_PIZZA_IN_ORDER,
        payload: {pizza_id}
    }
}

export function changePizza()
{
    return {
        type: CHANGE_PIZZA,
        payload: {}
    }
}

export function changeIngredientInSelectedPizza(ingredient_id)
{
    return {
        type: CHANGE_INGREDIENT_IN_SELECTED_PIZZA,
        payload: {ingredient_id}
    }

}

export function changeIngredientInCartPizza(ingredient_id)
{
    return {
        type: CHANGE_INGREDIENT_IN_CART_PIZZA,
        payload: {ingredient_id}
    }

}

export function unsetSelectedPizza()
{
    return {
        type: UNSET_SELECTED_PIZZA,
        payload: {}
    }
}

export function unsetPizzaChange()
{
    return {
        type: UNSET_PIZZA_CHANGE,
        payload: {}
    }

}

export function getIngredients()
{
    return {
        type: GET_INGREDIENTS,
        payload: {}
    }
}

export function setIngredients(ingredients)
{
    return {
        type: SET_INGREDIENTS,
        payload: {ingredients}
    }
}

export function setChosenPizzeria(pizzeria_id, pizzeria_address, orders_count)
{
    return {
        type: SET_CHOSEN_PIZZERIA,
        payload: {
            pizzeria_id: pizzeria_id,
            pizzeria_address: pizzeria_address,
            orders_count: orders_count
        }
    }
}

export function addPizzaToOrder(pizza)
{
    return {
        type: ADD_PIZZA_TO_ORDER,
        payload: {pizza}
    }
}

export function increaseSelectedPizzaQuantity(pizza_id)
{
    return {
        type: INCREASE_SELECTED_PIZZA_QUANTITY,
        payload: {pizza_id}
    }
}

export function decreaseSelectedPizzaQuantity(pizza_id)
{
    return {
        type: DECREASE_SELECTED_PIZZA_QUANTITY,
        payload: {pizza_id}
    }
}

export function deletePizzaFromOrder(pizza_id)
{
    return {
        type: DELETE_PIZZA_FROM_ORDER,
        payload: {pizza_id}
    }
}

export function getFoundPizzas(pizzeria_id, name)
{
    return {
        type: GET_FOUND_PIZZAS,
        payload: {
            pizzeria_id: pizzeria_id,
            name: name
        }
    }
}

export function getFoundPizzerias(address)
{
    return {
        type: GET_FOUND_PIZZERIAS,
        payload: {
            address: address
        }
    }
}

export function flipOrderHelpModalView()
{
    return {
        type: SHOW_ORDER_HELP_MODAL,
        payload: {}
    }
}

export function getOrderInfo(customers_phone_number)
{
    return {
        type: GET_ORDER_INFO,
        payload: {
            phone_number: customers_phone_number
        }
    }
}

export function flipOrderSubmitModalView()
{
    return {
        type: SHOW_ORDER_SUBMIT_MODAL,
        payload: {}
    }
}

export function makeOrder(
    pizzeria_id,
    customers_phone_number,
    delivery_address,
    total_price,
    order
)
{
    return {
        type: MAKE_ORDER,
        payload: {
            pizzeria_id: pizzeria_id,
            customers_phone_number: customers_phone_number,
            delivery_address: delivery_address,
            total_price: total_price,
            order: order
        }
    }
}

export function getPizzeriaByOperator(
    operator_id
)
{
    return {
        type: GET_PIZZERIA_BY_OPERATOR,
        payload: {
            operator_id: operator_id
        }
    }
}

export function setOperatorPizzeria(
    pizzeria_id,
    pizzeria_address,
    pizzeria_workload
)
{
    return {
        type: SET_OPERATOR_PIZZERIA,
        payload: {
            pizzeria_id: pizzeria_id,
            pizzeria_address: pizzeria_address,
            pizzeria_workload: pizzeria_workload
        }
    }
}

export function logoutUser()
{
    return {
        type: LOGOUT_USER,
        payload: {}
    }
}

export function getPizzeriaPizzasByOperator(operator_id)
{
    return {
        type: GET_PIZZERIA_PIZZAS_BY_OPERATOR,
        payload: {
            operator_id: operator_id
        }
    }
}

export function flipPizzaSelection(pizza_id)
{
    return {
        type: FLIP_PIZZA_SELECTION,
        payload: {
            pizza_id: pizza_id
        }
    }
}

export function resetPizzaSelection()
{
    return {
        type: RESET_PIZZA_SELECTION,
        payload: {}
    }
}

export function updatePizzeriaAvailablePizzas(operator_id, pizzas)
{
    return {
        type: UPDATE_PIZZERIA_AVAILABLE_PIZZAS,
        payload: {
            operator_id: operator_id,
            pizzas: pizzas
        }
    }
}
