


export function getOrder(state)
{
    return state.order;
}

export function getPizzeriasModalView(state)
{
    return state.pizzerias.show_pizzerias_modal;
}
export function getWelcomePost(state)
{
    return state.pizzerias.show_welcome_post;
}


export function getPizzeriasSelector(state)
{
    return state.pizzerias.pizzerias_list
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