export const VIEW_FILTER_BOX = "VIEW_FILTER_BOX"
export const ADD_PIZZA_TO_ORDER = "ADD_PIZZA_TO_ORDER"
export const SHOW_PIZZERIAS_MODAL = "SHOW_PIZZERIAS_MODAL"
export const SET_CHOSEN_PIZZERIA = "SET_CHOSEN_PIZZERIA"
export const SET_PIZZERIAS = "SET_PIZZERIAS"
export const GET_PIZZERIAS = "GET_PIZZERIA"


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



export function setPizzerias(pizzerias)
{
    return {
        type: SET_PIZZERIAS,
        payload: { pizzerias }
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






