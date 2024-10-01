// - Options:
//      - Number of Patties: (1-3)
//      - Cheese: Yes/No
//      - Vegetables: Lettuce, Tomato, Onion, Pickles (select multiple)
//      - Condiments: Ketchup, Mayo, Mustard
//      - Bun Type: Regular, Sesame, Whole Wheat
import promptSync from 'prompt-sync'
const prompts = promptSync()

type Patty = '1' | '2' | '3'
type Cheese = 'yes' | 'no'
type Vegetable = 'lettuce' | 'tomato' | 'onion' | 'pickles' // able to select multiple
type Condiment = 'ketchup' | 'mayo' | 'mustard'
type Bun = 'regular' | 'sesame' | 'whole wheat'

export class Burger implements Meal {
  public patties: Patty
  public cheese: Cheese
  public vegetables: Vegetable[]

  constructor() {
    this.patties = '1'
    this.cheese = 'no'
    this.vegetables = []
  }

  public description(): string {
    return `
    ORDER 
    ___
     food type: Burger
     patties: ${this.patties}
     cheese: ${this.cheese}
     vegetables: ${this.vegetables}`
  }
}

export class BurgerFactory implements MealFactory {
  createMeal(): Burger {
    return new Burger()
  }
}

interface BurgerBuilder {
  setPatties(count: Patty): BurgerBuilder
  hasCheese(answer: Cheese): BurgerBuilder
  addVegetables(veggies: Vegetable[]): BurgerBuilder
  build(): Burger
}

class ConcreteBurgerBuilder implements BurgerBuilder {
  private burger: Burger
  constructor() {
    this.burger = new Burger()
  }

  public setPatties(count: Patty): BurgerBuilder {
    this.burger.patties = count
    return this
  }
  public hasCheese(answer: Cheese): BurgerBuilder {
    this.burger.cheese = answer
    return this
  }

  public addVegetables(veggies: Vegetable[]): BurgerBuilder {
    this.burger.vegetables = veggies
    return this
  }
  public build(): Burger {
    return this.burger
  }
}

export function burgerMeal() {
  const pattyList = ['1', '2', '3']
  const cheeseList = ['yes', 'no']
  const vegetableOptions = ['lettuce', 'tomato', 'onion', 'pickles']

  const patties = prompts('how many patties?(1-3) ')
  var veggies = prompts(
    'What are your vegetables? (lettuce/tomato/onion/pickles)(separate by comma(,)) '
  )
  var cheese = prompts('cheese? (yes/no) ')

  const veggieArray: Vegetable[] = Array.from(new Set(veggies.split(',')))

  if (!pattyList.includes(patties) || !cheeseList.includes(cheese)) {
    throw new Error(`invalid input/s, try filling it up again!`)
  }
  veggieArray.forEach((vegetable) => {
    if (!vegetableOptions.includes(vegetable)) {
      throw new Error(`invalid input/s, try filling it up again!`)
    }
  })

  const buildBurger = new ConcreteBurgerBuilder()
    .addVegetables(veggieArray)
    .hasCheese(cheese)
    .setPatties(patties)
    .build()
  console.log(buildBurger.description())
}
