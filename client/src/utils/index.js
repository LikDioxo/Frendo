export function formatIngredients(ingredients)
{
    let show_ingredients = ingredients.map((el) => {return el.name.toLowerCase()});
    if(show_ingredients.length !== 0){
        show_ingredients[0] = show_ingredients[0].charAt(0).toUpperCase() + show_ingredients[0].slice(1);
        show_ingredients = show_ingredients.join(", ");
    }
    return show_ingredients;
}

export function formatCreationTime(date_time)
{
    date_time.setMilliseconds(0);
    let string_representation = date_time.toJSON();

    string_representation = string_representation.replace('T', ' ');
    string_representation = string_representation.replace('.000Z', '');

    return string_representation;
}

export function formatChoices(order)
{
    let choices = [];


    for (let pizza of Object.values(order.ordered_pizzas)) {
        choices.push({
            pizza_id: pizza.id,
            quantity: pizza.quantity,
            events: pizza.events
        })
    }

    return choices;
}
