export function currentUserSelector(state)
{
    return state.user;
}

export function getEntityType(state)
{
    return state.entity.entity_type;
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
    };
}

export function getDetailOrder(state)
{
    return state.pizzerias.detail_order;
}

export function getIngredientsSelector(state)
{
    return state.filter.ingredients;
}

export function getOperatorPizzeriaSelector(state)
{
    return state.user.pizzeria;
}

export function getOrdersForPizzeriaSelector(state)
{
    return state.pizzerias.orders;
}

export function getToasts(state)
{
    return state.toasts;
}

export function getAvailablePizzasOperatorModalView(state)
{
    return state.pizzerias.show_update_available_pizzas_modal;
}

export function getFetchAvailablePizzasSelector(state)
{
    return state.pizzerias.available_pizzas;
}

export function getUpdatedOrderSelector(state)
{
    return state.order.updated_order;
}

export function getFetchedEntities(state)
{
    return state.entity.fetched_entities;
}
