import promptSync from 'prompt-sync'
import { errorMessage } from './error'
const prompts = promptSync()

type Bread = 'white' | 'whole wheat' | 'sourdough'
type Meat = 'ham' | 'turkey' | 'chicken' | 'veggie'
type Cheese = 'yes' | 'no'
type Vegetable = 'lettuce' | 'tomato' | 'onion' | 'cucumber' // able to select multiple
type Sauce = 'mustard' | 'mayo' | 'pesto'

export class Sandwich implements Meal {
  public bread: Bread
  public protein: Meat
  public cheese: Cheese
  public sauce: Sauce
  public vegetables: Vegetable[]

  constructor() {
    this.bread = 'white'
    this.protein = 'ham'
    this.cheese = 'no'
    this.vegetables = []
    this.sauce = 'mayo'
  }

  public description(): string {
    return `
    ORDER 
    ___

     food type: Sandwich
     bread: ${this.bread}
     cheese: ${this.cheese}
     vegetables: ${this.vegetables}
     protein: ${this.protein}
     sauce: ${this.sauce}
     `
  }
}

export class SandwichFactory implements MealFactory {
  createMeal(): Sandwich {
    return new Sandwich()
  }
}

interface SandwichBuilder {
  setBread(type: Bread): SandwichBuilder
  setMeat(type: Meat): SandwichBuilder
  hasCheese(answer: Cheese): SandwichBuilder
  addVegetables(vegetables: Vegetable[]): SandwichBuilder
  setSauce(sauce: Sauce): SandwichBuilder
  build(): Sandwich
}

class ConcreteSandwichBuilder implements SandwichBuilder {
  private sandwich: Sandwich
  constructor() {
    this.sandwich = new Sandwich()
  }
  public setBread(type: Bread): SandwichBuilder {
    this.sandwich.bread = type
    return this
  }
  public addVegetables(vegetables: Vegetable[]): SandwichBuilder {
    this.sandwich.vegetables = vegetables
    return this
  }
  public hasCheese(answer: Cheese): SandwichBuilder {
    this.sandwich.cheese = answer
    return this
  }
  public setMeat(type: Meat): SandwichBuilder {
    this.sandwich.protein = type
    return this
  }

  public setSauce(sauce: Sauce): SandwichBuilder {
    this.sandwich.sauce = sauce
    return this
  }

  public build(): Sandwich {
    return this.sandwich
  }
}

export function sandwichMeal() {
  const breadList = ['white', 'whole wheat', 'sourdough']
  const proteinList = ['ham', 'turkey', 'chicken', 'veggie']
  const cheeseAnswer = ['yes', 'no']
  const vegetableOptions = ['lettuce', 'tomato', 'onion', 'cucumber']
  const sauceList = ['mustard', 'mayo', 'pesto']

  const bread = prompts(
    'What type of bread for your sandwich?(white,whole wheat,sourdough) '
  )
  const protein = prompts(
    'What type of meat would you like?(ham/turkey/chicken/veggie) '
  )
  const cheese = prompts('Would you like cheese on it?(yes/no) ')
  const vegetables = prompts(
    'What vegetables would you like to add?(lettuce,tomato,onion,cucumber)(separate by comma(,)) '
  )
  const sauce = prompts('What sauce would you like?(mustard/mayo/pesto) ')
  const veggieArray: Vegetable[] = Array.from(new Set(vegetables.split(',')))
  if (
    !breadList.includes(bread) ||
    !proteinList.includes(protein) ||
    !cheeseAnswer.includes(cheese) ||
    !sauceList.includes(sauce)
  ) {
    errorMessage('INVALID_INPUT')
  }
  veggieArray.forEach((vegetable) => {
    if (!vegetableOptions.includes(vegetable)) {
      errorMessage('INVALID_INPUT')
    }
  })

  const buildSandwich = new ConcreteSandwichBuilder()
    .addVegetables(vegetables)
    .hasCheese(cheese)
    .setBread(bread)
    .setMeat(protein)
    .setSauce(sauce)
    .build()

  return buildSandwich
}
