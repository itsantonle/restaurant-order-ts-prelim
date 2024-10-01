import promptSync from 'prompt-sync'
const prompts = promptSync()
import { burgerMeal, Burger, BurgerFactory } from './burger'

/**
 * make a main prompt class
 * make module for the burrito and sandwich
 * do error handling ripz emton
 * i mean i could compile this all in one file
 * yeah.
 * just put comments and sepearator
 */

function customizeMeal(test: Meal) {
  if (test instanceof Burger) {
    burgerMeal()
  }
}

function mainPrompt() {
  const mealType = prompts('what type of meal would you like? ')
  switch (mealType) {
    case 'burger':
      customizeMeal(new BurgerFactory().createMeal())
      break
    default:
      throw new Error('not a valid meal type!')
  }
}

mainPrompt()
