import {combineReducers} from "redux";

import {
    VIEW_FILTER_BOX,
    ADD_PIZZA_TO_ORDER,
    SHOW_PIZZERIAS_MODAL,
    SET_CHOSEN_PIZZERIA,
    SET_PIZZERIAS,
    SET_PIZZAS,
    SET_INGREDIENTS,
    FLIP_INGREDIENT_SELECTION,
    RESET_INGREDIENT_SELECTION,
    START_PIZZA_LOADING,
    END_PIZZA_LOADING, SET_SELECTED_PIZZA, UNSET_SELECTED_PIZZA
} from "../actions";

function loadingReducer(state={}, action)
{
    let tmp;
    switch (action.type)
    {
        case START_PIZZA_LOADING:
            tmp = {...state};
            tmp.isLoading = true;
            return tmp;
        case END_PIZZA_LOADING:
            tmp = {...state};
            tmp.isLoading = false;
            return tmp;
        default:
            return state;
    }
}



function filterReducer(state={}, action)
{
    let tmp;
    switch (action.type)
    {
        case VIEW_FILTER_BOX:
            tmp = {...state};
            tmp.isFilterView = !state.isFilterView;

            return tmp;
        case SET_INGREDIENTS:
            tmp = {...state};
            const ingredients = {};

            for (let ingredient of action.payload.ingredients) {
                ingredients[ingredient.id] = {
                    name: ingredient.name,
                    flag: false
                }
            }
            tmp.ingredients = ingredients
            return tmp;
        case FLIP_INGREDIENT_SELECTION:
            tmp = {...state};
            tmp.ingredients[action.payload.ingredient_id].flag = !tmp.ingredients[action.payload.ingredient_id].flag;
            return tmp;
        case RESET_INGREDIENT_SELECTION:
            tmp = {...state};
            for (let ingredient in tmp.ingredients) {
                tmp.ingredients[ingredient].flag = false;
            }
            return tmp;
        default:
            return state;
    }
}

function orderReducer(state={ordered_pizzas: {}}, action)
{
    switch (action.type)
    {
        case ADD_PIZZA_TO_ORDER:
            let tmp = {...state};
            tmp.ordered_pizzas[action.payload.pizza.id] = {...action.payload.pizza};
            tmp.ordered_pizzas[action.payload.pizza.id].quantity = 1;
            return tmp;

        default:
            return state;
    }
}

function pizzeriasReducer(state = {}, action)
{
    let tmp
    switch (action.type)
    {
        case SHOW_PIZZERIAS_MODAL:
            tmp =  {...state};
            tmp.show_pizzerias_modal = !state.show_pizzerias_modal;

            return tmp;
        case SET_CHOSEN_PIZZERIA:
            tmp = {...state};
            tmp.pizzeria_id = action.payload.pizzeria_id;
            tmp.pizzeria_address = action.payload.pizzeria_address;
            tmp.orders_count = action.payload.orders_count;
            tmp.chosen = true;
            return tmp;
        case SET_PIZZERIAS:
            tmp = {...state};
            tmp.pizzerias_list = action.payload.pizzerias;
            return tmp;

        default:
            return state;
    }

}

function pizzaReducer(state={}, action) {
    let tmp;
    switch (action.type)
    {
        case SET_PIZZAS:
            tmp = {...state};
            tmp.pizzas = action.payload.pizzas;
            return tmp;
        case SET_SELECTED_PIZZA:
            tmp = {...state};
            tmp.pizza_selected = true;
            tmp.selected_pizza = {...action.payload.pizza};

            tmp.selected_pizza.ingredients = {};
            let ingredients = [...action.payload.pizza.ingredients]

            for (let ingredient of ingredients) {
                tmp.selected_pizza.ingredients[ingredient.id] = {
                    id: ingredient.id,
                    status: ingredient.status,
                    name: ingredient.name,
                    price: ingredient.price,
                    flag: ingredient.status === 0 || ingredient.status === 1

                };
            }


            return tmp
        case UNSET_SELECTED_PIZZA:
            tmp = {...state};
            tmp.pizza_selected = false;
            tmp.selected_pizza = null;

            return tmp
        default:
            return state;
    }


}



const mainReducer = combineReducers({
        filter: filterReducer,
        order: orderReducer,
        pizzerias: pizzeriasReducer,
        pizza: pizzaReducer,
        loading: loadingReducer
    }
)


export default mainReducer;