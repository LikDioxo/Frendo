


export function getOrder(state)
{
    return state.order;
}

export function getPizzeriasModalView(state)
{
    return state.pizzerias.show_pizzerias_modal;
}


export function isFilterView(state)
{
    return state.filter.isFilterView;
}


export function getPizzeriasSelector(state)
{
    return state.pizzerias.pizzerias_list
}

export function getAvailablePizzasSelector(state)
{
    return state.pizza.pizzas
}


export function getChosenPizzeria(state)
{
    return {
        pizzeria_id: state.pizzerias.pizzeria_id,
        pizzeria_address: state.pizzerias.pizzeria_address,
        orders_count: state.pizzerias.orders_count,
        chosen: state.pizzerias.chosen
    }

}

export function getIngredientsSelector(state)
{
    return state.filter.ingredients

}

