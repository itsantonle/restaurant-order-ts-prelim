import promptSync from 'prompt-sync'
const prompts = promptSync()
import { BurgerFactory } from './burger'
import { BurritoFactory } from './burrito'
import { SandwichFactory } from './sandwich'
import { isCombo, customizeMeal } from './subprompts'
import { errorMessage } from './error'

// this is the main app

function mainPrompt() {
  const mealType = prompts(
    'Welcome to the restaurant! What type of meal would you like?(burger,sandwich,burrito) '
  )
  var meal: Meal = null

  switch (mealType) {
    case 'burger':
      meal = customizeMeal(new BurgerFactory().createMeal())
      break
    case 'burrito':
      meal = customizeMeal(new BurritoFactory().createMeal())
      break
    case 'sandwich':
      meal = customizeMeal(new SandwichFactory().createMeal())
      break
    default:
      errorMessage('CLASS_NOT_FOUND')
  }

  const addCombo = prompts('Would you like to add fries and drinks?(yes/no) ')
  switch (addCombo) {
    case 'yes':
      console.log(isCombo(meal))
      break
    case 'no':
      console.log(meal.description())
      break
    default:
      errorMessage()
  }
}

mainPrompt()
