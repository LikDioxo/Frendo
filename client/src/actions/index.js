export const VIEW_FILTER_BOX = "VIEW_FILTER_BOX"
export const ADD_PIZZA_TO_ORDER = "ADD_PIZZA_TO_ORDER"
export const SHOW_PIZZERIAS_MODAL = "SHOW_PIZZERIAS_MODAL"
export const SET_CHOSEN_PIZZERIA = "SET_CHOSEN_PIZZERIA"
export const SET_PIZZERIAS = "SET_PIZZERIAS"
export const GET_PIZZERIAS = "GET_PIZZERIA"
export const SET_PIZZAS = "SET_PIZZAS"
export const GET_AVAILABLE_PIZZAS = "GET_AVAILABLE_PIZZAS"
export const GET_FILTERED_PIZZAS = "GET_FILTERED_PIZZAS"
export const SET_INGREDIENTS = "SET_INGREDIENTS"
export const GET_INGREDIENTS = "GET_INGREDIENTS"
export const FLIP_INGREDIENT_SELECTION = "FLIP_INGREDIENT_SELECTION"
export const RESET_INGREDIENT_SELECTION = "RESET_INGREDIENT_SELECTION"
export const START_PIZZA_LOADING = "START_PIZZA_LOADING"
export const END_PIZZA_LOADING = "END_PIZZA_LOADING"

export function startPizzaLoading()
{
    return {
        type: START_PIZZA_LOADING
    }
}

export function endPizzaLoading()
{
    return {
        type: END_PIZZA_LOADING
    }
}


export function flipFilterView()
{
    return {
        type: VIEW_FILTER_BOX
    }
}

export function flipPizzeriasModalView()
{
    return {
        type: SHOW_PIZZERIAS_MODAL
    }
}


export function getPizzerias()
{
    return{
        type: GET_PIZZERIAS,
        payload: {}
    }

}
export function flipIngredientSelection(ingredient_id)
{
    return {
        type: FLIP_INGREDIENT_SELECTION,
        payload:{ingredient_id}
    }
}
export function resetIngredientSelection()
{
    return {
        type: RESET_INGREDIENT_SELECTION
    }
}

export function setPizzerias(pizzerias)
{
    return {
        type: SET_PIZZERIAS,
        payload: { pizzerias }
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

    //"["+fetch_ingredients.join(",")+"]"

    return{
        type: GET_FILTERED_PIZZAS,
        payload: {
            pizzeria_id: pizzeria_id,
            ingredients: ingredients
        }
    }

}



export function setPizzas(pizzas) {
    return {
        type: SET_PIZZAS,
        payload: { pizzas }
    }

}

export function getIngredients()
{
    return{
        type: GET_INGREDIENTS,
        payload: {}
    }

}


export function setIngredients(ingredients)
{
    return{
        type: SET_INGREDIENTS,
        payload: {ingredients}
    }

}



export function setChosenPizzeria(pizzeria_id, pizzeria_address, orders_count) {

    return {
        type: SET_CHOSEN_PIZZERIA,
        payload: {
            pizzeria_id: pizzeria_id,
            pizzeria_address: pizzeria_address,
            orders_count: orders_count
        }
    }
}



export function addPizzaToOrder(pizza_id, ingredients)
{
    return {
        type: ADD_PIZZA_TO_ORDER,
        payload: {
                pizza_id: pizza_id,
                quantity: 1,
                ingredient: ingredients.map((ingredient_id, isEnabled) => {return {
                    ingredient_id: isEnabled
                }
                })

            }
    }
}






