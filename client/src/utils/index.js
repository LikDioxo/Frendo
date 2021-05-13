export function formatIngredients(ingredients)
{
    let show_ingredients = ingredients.map((el) => {return el.name.toLowerCase()});
    if(show_ingredients.length !== 0){
        show_ingredients[0] = show_ingredients[0].charAt(0).toUpperCase() + show_ingredients[0].slice(1);
        show_ingredients = show_ingredients.join(", ");
    }
    return show_ingredients;
}
