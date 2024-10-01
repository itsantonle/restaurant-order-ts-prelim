interface Meal {
  description(): string
}

interface MealFactory {
  createMeal(): Meal
}
