import {combineReducers} from "redux";

import {
    VIEW_FILTER_BOX,
    ADD_PIZZA_TO_ORDER,
    SHOW_PIZZERIAS_MODAL,
    SET_CHOSEN_PIZZERIA,
    SET_PIZZERIAS
} from "../actions";


function filterReducer(state={}, action)
{
    switch (action.type)
    {
        case VIEW_FILTER_BOX:
            let tmp =  {...state};
            tmp.isFilterView = !state.isFilterView;

            return tmp;
        default:
            return state;
    }
}

function orderReducer(state=[], action)
{
    switch (action.type)
    {
        case ADD_PIZZA_TO_ORDER:
            let tmp = [...state];
            tmp.append(action.payload);
            return tmp;
        default:
            return state;
    }
}

function pizzeriasReducer(state = {show_welcome_post: true}, action)
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
            tmp.show_welcome_post = false;
            return tmp;
        case SET_PIZZERIAS:
            tmp = {...state}
            tmp.pizzerias_list = action.payload.pizzerias
            return tmp

        default:
            return state;
    }

}




const mainReducer = combineReducers({
        filter: filterReducer,
        order: orderReducer,
        pizzerias: pizzeriasReducer
    }
)


export default mainReducer;