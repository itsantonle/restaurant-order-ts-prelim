import promptSync from 'prompt-sync'
const prompts = promptSync()

/**
 * make a main prompt class
 * make module for the burrito and sandwich
 * do error handling ripz emton
 * i mean i could compile this all in one file
 * yeah.
 * just put comments and sepearator
 */

function burgerMeal() {
  const veggies = prompts(
    'What are your vegetables? (pickles/onions/tomatoes) '
  )
  const cheese = prompts('cheese? (true/false) ')
  const patties = prompts('how many patties?(1-3) ')
  const buildBurger = new ConcreteBurgerBuilder()
    .addVegetables(veggies.split(','))
    .hasCheese(cheese == 'true')
    .setPatties(Number.parseInt(patties))
    .build()
  console.log(buildBurger.description())
}

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
