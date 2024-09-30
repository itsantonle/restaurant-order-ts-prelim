const ps = require('prompt-sync')
const prompts = ps()

/**
 * make a main prompt class
 * make module for the burrito and sandwich
 * do error handling ripz emton
 * i mean i could compile this all in one file
 * yeah.
 * just put comments and sepearator
 */
interface Meal {
  description(): string
}

class Burger implements Meal {
  public patties: number
  public cheese: boolean
  public vegetables: string[]

  constructor() {
    this.patties = 0
    this.cheese = false
    this.vegetables = []
  }

  public description(): string {
    return `burger = patties: ${this.patties}, cheese: ${this.cheese}, vegetables: ${this.vegetables}`
  }
}

interface MealFactory {
  createMeal(): Meal
}

class BurgerFactory implements MealFactory {
  createMeal(): Burger {
    return new Burger()
  }
}

interface BurgerBuilder {
  setPatties(count: number): BurgerBuilder
  hasCheese(answer: boolean): BurgerBuilder
  addVegetables(veggies: string[]): BurgerBuilder
  build(): Burger
}

class ConcreteBurgerBuilder implements BurgerBuilder {
  private burger: Burger
  constructor() {
    this.burger = new Burger()
  }

  public setPatties(count: number): BurgerBuilder {
    this.burger.patties = count
    return this
  }
  public hasCheese(answer: boolean): BurgerBuilder {
    this.burger.cheese = answer
    return this
  }

  public addVegetables(veggies: string[]): BurgerBuilder {
    this.burger.vegetables = veggies
    return this
  }
  public build(): Burger {
    return this.burger
  }
}

// try to put this in like the main file instead lol
function test(test: Meal) {
  if (test instanceof Burger) {
    const veggies = prompts('What are your vegetables? ')
    const cheese = prompts('cheese? true/false ')
    const patties = prompts('how many patties? ')
    const buildBurger = new ConcreteBurgerBuilder()
      .addVegetables(veggies.split(','))
      .hasCheese(cheese == 'true')
      .setPatties(Number.parseInt(patties))
      .build()
    console.log(buildBurger.description())
  }
}

const borg = new BurgerFactory().createMeal()
test(borg)
