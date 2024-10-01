// - Options:
//      - Number of Patties: (1-3)
//      - Cheese: Yes/No
//      - Vegetables: Lettuce, Tomato, Onion, Pickles (select multiple)
//      - Condiments: Ketchup, Mayo, Mustard
//      - Bun Type: Regular, Sesame, Whole Wheat

type Patty = 1 | 2 | 3
type Cheese = 'yes' | 'no'
type Vegetable = 'Lettuce' | 'tomato' | 'onion' | 'pickles' // able to select multiple
type Condiment = 'ketchup' | 'mayo' | 'mustard'
type Bun = 'regular' | 'sesame' | 'whole wheat'

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
    return `
    ORDER 
    ___
     food type: Burger
     patties: ${this.patties}
     cheese: ${this.cheese}
     vegetables: ${this.vegetables}`
  }
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
