export function setSearchedMeals(state, meals) {
  state.searchedMeals = Array.isArray(meals) ? meals : []
}
export function setMealsByLetter(state, meals) {
  state.mealsByLetter = Array.isArray(meals) ? meals : []
}
export function setMealsByIngredients(state, meals) {
  state.mealsByIngredient = Array.isArray(meals) ? meals : []
}
export function setIngredient(state, ingredient) {
  state.ingredient = ingredient
}