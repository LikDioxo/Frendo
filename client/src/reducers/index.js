import {combineReducers} from "redux";

import {
    VIEW_FILTER_BOX
} from "../actions";





function filterReducer(state={}, action)
{
    switch (action.type)
    {
        case VIEW_FILTER_BOX:
            let tmp =  {...state};
            tmp.isFilterView = !state.isFilterView;

            return tmp
        default:
            return state;
    }

}

function orderReducer(state)
{



}




const mainReducer = combineReducers({
        filter: filterReducer
    }
)


export default mainReducer;