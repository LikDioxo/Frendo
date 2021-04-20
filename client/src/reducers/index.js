import {combineReducers} from "redux";

import {
    VIEW_FILTER_BOX,
    ADD_PIZZA_TO_ORDER
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


const mainReducer = combineReducers({
        filter: filterReducer,
        order: orderReducer
    }
)


export default mainReducer;