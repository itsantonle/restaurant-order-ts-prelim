import { burgerMeal, Burger } from './burger'
import { burritoMeal, Burrito } from './burrito'
import { sandwichMeal, Sandwich } from './sandwich'
import promptSync from 'prompt-sync'
const prompts = promptSync()
import { errorMessage } from './error'

// calculations for the main prompt

export function isCombo(meal: Meal) {
  const drinksList = ['sprite', 'coke', 'pepsi']
  const drink = prompts(
    'what drink would you like to have with your meal?(sprite, coke, pepsi) '
  )
  if (!drinksList.includes(drink)) {
    errorMessage('DRINK_NOT_FOUND')
  }
  return (
    meal.description() +
    `drinks: ${drink} 
     fries: yes`
  )
}
export function customizeMeal(test: Meal) {
  if (test instanceof Burger) {
    return burgerMeal()
  }
  if (test instanceof Burrito) {
    return burritoMeal()
  }
  if (test instanceof Sandwich) {
    return sandwichMeal()
  }
}
