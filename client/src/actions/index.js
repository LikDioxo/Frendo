export const VIEW_FILTER_BOX = "VIEW_FILTER_BOX"
export const ADD_PIZZA_TO_ORDER = "ADD_PIZZA_TO_ORDER"


export function flipFilterView()
{
    return {
        type: VIEW_FILTER_BOX
    }
}

export function addPizzaToOrder(pizza_id, ingredients)
{
    return {
        type: ADD_PIZZA_TO_ORDER,
        payload: {
                pizzaid: pizza_id,
                quantity: 1,
                ingredient: ingredients.map((ingredient_id, isEnabled) => {return {
                    ingredient_id: isEnabled
                }
                })

            }
    }
}

