import promptSync from 'prompt-sync'
import { errorMessage } from './error'
const prompts = promptSync()

type Beans = 'pinto' | 'black'
type Rice = 'white' | 'brown'
type Protein = 'chicken' | 'beef' | 'tofu'
type Toppings = 'salsa' | 'guacamole' | 'sour cream' | 'cheese'

class Burrito implements Meal {
  public beans: Beans
  public rice: Rice
  public protein: Protein
  public toppings: Toppings

  constructor() {
    this.beans = 'pinto'
    this.rice = 'white'
    this.protein = 'chicken'
    this.toppings = 'salsa'
  }

  public description(): string {
    return `
    ORDER 
    ___
     food type: Burrito
     type of beans: ${this.beans}
     type of rice: ${this.rice}
     added meat: ${this.protein}
     added toppings: ${this.toppings}
    
     `
  }
}

class BurritoFactory implements MealFactory {
  createMeal(): Burrito {
    return new Burrito()
  }
}

interface BurritoBuilder {
  setBeans(beans: Beans): BurritoBuilder
  setRice(rice: Rice): BurritoBuilder
  addProtein(protein: Protein): BurritoBuilder
  addToppings(toppings: Toppings): BurritoBuilder
  build(): Burrito
}

class ConcreteBurritoBuilder implements BurritoBuilder {
  private burrito: Burrito
  constructor() {
    this.burrito = new Burrito()
  }

  public setBeans(beans: Beans): BurritoBuilder {
    this.burrito.beans = beans
    return this
  }

  public setRice(rice: Rice): BurritoBuilder {
    this.burrito.rice = rice
    return this
  }

  public addProtein(protein: Protein): BurritoBuilder {
    this.burrito.protein = protein
    return this
  }

  public addToppings(toppings: Toppings): BurritoBuilder {
    this.burrito.toppings = toppings
    return this
  }

  public build(): Burrito {
    return this.burrito
  }
}
