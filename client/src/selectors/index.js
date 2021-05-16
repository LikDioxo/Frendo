
export function currentUserSelector(state)
{
    return state.user;
}

export function isLoading(state)
{
    return state.loading.isLoading;
}

export function getOrder(state)
{
    return state.order;
}

export function getPizzeriasModalView(state)
{
    return state.pizzerias.show_pizzerias_modal;
}

export function getOrderHelpModalView(state)
{
    return state.order.show_order_help_modal;
}

export function getOrderSubmitModalView(state)
{
    return state.order.show_order_submit_modal;
}

export function isFilterView(state)
{
    return state.filter.isFilterView;
}

export function getPizzeriasSelector(state)
{
    return state.pizzerias.pizzerias_list;
}

export function getAvailablePizzasSelector(state)
{
    return state.pizza.pizzas;
}

export function getSelectedPizza(state)
{
    return state.pizza.selected_pizza;
}
export function getPizzaChange(state)
{
    return state.order.to_change;
}

export function isPizzaSelected(state)
{
    return state.pizza.pizza_selected;
}
export function isPizzaChange(state)
{
    return state.order.change;
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
    return state.filter.ingredients;
}

export function getOperatorPizzeriaSelector(state)
{
    return state.user.pizzeria;
}
