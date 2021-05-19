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
    END_PIZZA_LOADING,
    SET_SELECTED_PIZZA,
    UNSET_SELECTED_PIZZA,
    CLEAR_CART,
    INCREASE_SELECTED_PIZZA_QUANTITY,
    DECREASE_SELECTED_PIZZA_QUANTITY,
    DELETE_PIZZA_FROM_ORDER,
    CHANGE_PIZZA,
    UNSET_PIZZA_CHANGE,
    CHANGE_PIZZA_IN_ORDER,
    CHANGE_INGREDIENT_IN_CART_PIZZA,
    CHANGE_INGREDIENT_IN_SELECTED_PIZZA,
    SHOW_ORDER_HELP_MODAL,
    SHOW_ORDER_SUBMIT_MODAL,
    SET_CURRENT_USER,
    SET_OPERATOR_PIZZERIA,
    LOGOUT_USER,
    FLIP_PIZZA_SELECTION,
    RESET_PIZZA_SELECTION,
    SET_ORDERS_FOR_PIZZERIA,
    ADD_TOAST,
    SET_DETAIL_ORDER,
    SHOW_UPDATE_AVAILABLE_PIZZAS_MODAL,
    SET_FETCH_AVAILABLE_PIZZAS,
    SET_UPDATED_ORDER,
    UNSET_UPDATED_ORDER,
    SET_ENTITY_TYPE
} from "../actions";
import {formatCreationTime} from "../utils";


function userReducer(state=null, action)
{
    let tmp;
    switch (action.type)
    {
        case SET_CURRENT_USER:
            tmp = action.payload.user;
            return tmp;

        case SET_OPERATOR_PIZZERIA:
            tmp = {...state};

            tmp.pizzeria = {
                id: action.payload.pizzeria_id,
                address: action.payload.pizzeria_address,
                workload: action.payload.pizzeria_workload
            };

            return tmp;

        case LOGOUT_USER:
            return {};

        default:
            return state;
    }
}

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
    let tmp;
    switch (action.type)
    {
        case ADD_PIZZA_TO_ORDER:
            tmp = {...state};

            let to_add = JSON.parse(JSON.stringify(action.payload.pizza));

            let existed = Object.values(tmp.ordered_pizzas).find((el) => {
                if(el.id !== to_add.id)
                {
                    return false
                }
                if(Object.keys(to_add.ingredients).length !== Object.keys(el.ingredients).length)
                {
                    return false;
                }
                for (const i of Object.values(to_add.ingredients)) {

                    if(el.ingredients[i.id] === undefined || i.flag !== el.ingredients[i.id].flag)
                    {
                        return false;
                    }
                }
                return true;
            })

            if(existed !== undefined)
            {
                let single_price = existed.price/existed.quantity;
                existed.quantity++;
                existed.price = single_price*existed.quantity;
            }
            else
            {
                to_add.quantity = 1;
                to_add.order_id = Object.keys(tmp.ordered_pizzas).length;
                tmp.ordered_pizzas[Object.keys(tmp.ordered_pizzas).length] = to_add;

            }

            return tmp;

        case CLEAR_CART:
            tmp = {...state};
            tmp.ordered_pizzas = {};
            return tmp;

        case INCREASE_SELECTED_PIZZA_QUANTITY:
            tmp = {...state};
            let single_price = tmp.ordered_pizzas[action.payload.pizza_id].price / tmp.ordered_pizzas[action.payload.pizza_id].quantity
            tmp.ordered_pizzas[action.payload.pizza_id].quantity++;
            tmp.ordered_pizzas[action.payload.pizza_id].price = single_price * tmp.ordered_pizzas[action.payload.pizza_id].quantity
            return tmp;

        case DECREASE_SELECTED_PIZZA_QUANTITY:
            tmp = {...state};

            if (tmp.ordered_pizzas[action.payload.pizza_id].quantity > 1) {
                let single_price = tmp.ordered_pizzas[action.payload.pizza_id].price / tmp.ordered_pizzas[action.payload.pizza_id].quantity
                tmp.ordered_pizzas[action.payload.pizza_id].quantity--;
                tmp.ordered_pizzas[action.payload.pizza_id].price = single_price * tmp.ordered_pizzas[action.payload.pizza_id].quantity
            }
            return tmp;

        case DELETE_PIZZA_FROM_ORDER:
            tmp = {...state};
            delete tmp.ordered_pizzas[action.payload.pizza_id];
            return tmp;

        case CHANGE_PIZZA_IN_ORDER:
            tmp = {...state};
            tmp.to_change = {...tmp.ordered_pizzas[action.payload.pizza_id]};
            let t1 = {}

            for (const ingr of Object.keys(tmp.ordered_pizzas[action.payload.pizza_id].ingredients)) {
                t1[ingr] = {...tmp.ordered_pizzas[action.payload.pizza_id].ingredients[ingr]}
            }
            tmp.to_change.ingredients = t1;
            tmp.change = true;
            tmp.to_change.events = [];
            return tmp;

        case UNSET_PIZZA_CHANGE:
            tmp = {...state};
            tmp.to_change = null;
            tmp.change = false;
            return tmp;

        case CHANGE_PIZZA:
            tmp = {...state};
            tmp.ordered_pizzas[tmp.to_change.order_id] = {...tmp.to_change};
            tmp.to_change = null
            tmp.change = false;
            return tmp;

        case CHANGE_INGREDIENT_IN_CART_PIZZA:
            tmp = {...state};
            let selected_ingredient = tmp.to_change.ingredients[action.payload.ingredient_id]

            selected_ingredient.flag = !selected_ingredient.flag

            if (selected_ingredient.status === 2) {
                if (selected_ingredient.flag) tmp.to_change.price += selected_ingredient.price * tmp.to_change.quantity
                else tmp.to_change.price -= selected_ingredient.price * tmp.to_change.quantity
            }

            let current_time = new Date();

            tmp.to_change.events.push({
                ingredient_id: selected_ingredient.id,
                is_enabled: selected_ingredient.flag,
                creation_time: formatCreationTime(current_time)
            });

            return tmp;

        case SHOW_ORDER_HELP_MODAL:
            tmp = {...state};
            tmp.show_order_help_modal = !state.show_order_help_modal;
            return tmp;

        case SHOW_ORDER_SUBMIT_MODAL:
            tmp = {...state};
            tmp.show_order_submit_modal = !state.show_order_submit_modal;
            return tmp;

        case SET_UPDATED_ORDER:
            tmp = {...state};
            tmp.updated_order = {
                order_id: action.payload.order_id,
                status: action.payload.status
            }

            return tmp;

        case UNSET_UPDATED_ORDER:
            tmp = {...state};
            tmp.updated_order = {}

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

        case SET_ORDERS_FOR_PIZZERIA:
            tmp =  {...state};
            tmp.orders = {};
            for (const order of action.payload.orders) {
                tmp.orders[order.id] = {...order}
            }
            return tmp;

        case SHOW_UPDATE_AVAILABLE_PIZZAS_MODAL:
            tmp =  {...state};
            tmp.show_update_available_pizzas_modal = !state.show_update_available_pizzas_modal;
            return tmp;

        case SET_DETAIL_ORDER:
            tmp = {...state};
            let order = action.payload.order;
            tmp.detail_order = {...order,
                choices: [...order.choices]}
            action.payload.history.push("/operator/order")
            return tmp;

        case SET_FETCH_AVAILABLE_PIZZAS:
            tmp = {...state};
            tmp.available_pizzas = action.payload.available_pizzas;
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
            tmp.selected_pizza.events = [];
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

        case CHANGE_INGREDIENT_IN_SELECTED_PIZZA:
            tmp = {...state};
            tmp = {...state};
            let selected_ingredient = tmp.selected_pizza.ingredients[action.payload.ingredient_id]

            selected_ingredient.flag = !selected_ingredient.flag

            if (selected_ingredient.status === 2) {
                if (selected_ingredient.flag) tmp.selected_pizza.price += selected_ingredient.price
                else tmp.selected_pizza.price -= selected_ingredient.price
            }

            let current_time = new Date();

            tmp.selected_pizza.events.push({
                ingredient_id: selected_ingredient.id,
                is_enabled: selected_ingredient.flag,
                creation_time: formatCreationTime(current_time)
            });

            return tmp;

        case FLIP_PIZZA_SELECTION:
            let pizzas = Object.values(state.pizzas);

            pizzas = pizzas.map(pizza => {
                if (pizza.id !== +action.payload.pizza_id) return pizza;
                return {...pizza, is_available: !pizza.is_available};
            });

            let _pizzas = {}

            for (let pizza of pizzas) {
                _pizzas[pizza.id] = pizza
            }

            tmp = {
                ...state,
                pizzas: _pizzas
            }
            return tmp;

        case RESET_PIZZA_SELECTION:

            let pizzas2 = Object.values(state.pizzas);

            pizzas2 = pizzas2.map(pizza => {
                return {...pizza, is_available: true};
            });

            let _pizzas2 = {}

            for (let pizza of pizzas2) {
                _pizzas2[pizza.id] = pizza
            }

            tmp = {
                ...state,
                pizzas: _pizzas2
            }

            return tmp;

        default:
            return state;
    }
}

function toastsReducer(state=null, action) {
    switch (action.type)  {
        case ADD_TOAST:
            return action.payload;

        default:
            return state;
    }
}


function entityReducer(state={}, action)
{
    let tmp;
    switch (action.type)  {
        case SET_ENTITY_TYPE:
            tmp = {...state};
            tmp.entity_type = action.payload.entity_type
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
        loading: loadingReducer,
        user: userReducer,
        toasts: toastsReducer,
        entity: entityReducer
    }
)


export default mainReducer;
