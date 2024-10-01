import promptSync from 'prompt-sync'
import { errorMessage } from './error'
const prompts = promptSync()

type Patty = '1' | '2' | '3'
type Cheese = 'yes' | 'no'
type Vegetable = 'lettuce' | 'tomato' | 'onion' | 'pickles' // able to select multiple
type Condiment = 'ketchup' | 'mayo' | 'mustard' // able to select multiple
type Bun = 'regular' | 'sesame' | 'whole wheat'

export class Burger implements Meal {
  public patties: Patty
  public cheese: Cheese
  public vegetables: Vegetable[]
  public condiments: Condiment[]
  public bun: Bun

  constructor() {
    this.patties = '1'
    this.cheese = 'no'
    this.vegetables = []
    this.condiments = []
    this.bun = 'regular'
  }

  public description(): string {
    return `
    ORDER 
    ___

     food type: Burger
     patties: ${this.patties}
     cheese: ${this.cheese}
     vegetables: ${this.vegetables}
     condiments: ${this.condiments}
     bun: ${this.bun}
     `
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
  addCondiments(condiments: Condiment[]): BurgerBuilder
  chooseBun(bun: Bun): BurgerBuilder
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

  public addCondiments(condiments: Condiment[]): BurgerBuilder {
    this.burger.condiments = condiments
    return this
  }
  public chooseBun(bun: Bun): BurgerBuilder {
    this.burger.bun = bun
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
  const condimentOptions = ['ketchup', 'mayo', 'mustard']
  const bunList = ['regular', 'sesame', 'whole wheat']

  const patties = prompts('how many patties?(1-3) ')
  const veggies = prompts(
    'What are your vegetables? (lettuce/tomato/onion/pickles)(separate by comma(,)) '
  )
  const cheese = prompts('cheese? (yes/no) ')
  const condiments = prompts(
    'What are your condiments? (ketchup/ mayo/ mustard) (separate by comma(,) '
  )
  const bun = prompts(
    'what type of bun would you like? (regular, sesame, whole wheat) '
  )
  const condimentsArray: Condiment[] = Array.from(
    new Set(condiments.split(','))
  )

  const veggieArray: Vegetable[] = Array.from(new Set(veggies.split(',')))

  if (
    !pattyList.includes(patties) ||
    !cheeseList.includes(cheese) ||
    !bunList.includes(bun)
  ) {
    errorMessage('INVALID_INPUT')
  }
  veggieArray.forEach((vegetable) => {
    if (!vegetableOptions.includes(vegetable)) {
      errorMessage('INVALID_INPUT')
    }
  })
  condimentsArray.forEach((condiment) => {
    if (!condimentOptions.includes(condiment)) {
      errorMessage('INVALID_INPUT')
    }
  })

  const buildBurger = new ConcreteBurgerBuilder()
    .addVegetables(veggieArray)
    .hasCheese(cheese)
    .setPatties(patties)
    .addCondiments(condimentsArray)
    .chooseBun(bun)
    .build()

  return buildBurger
}
