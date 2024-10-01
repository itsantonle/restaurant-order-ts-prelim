export function errorMessage(error?: string) {
  switch (error) {
    case 'INVALID_INPUT':
      throw new Error('One or many of your inputs may have been invalid')

    case 'CLASS_NOT_FOUND':
      throw new Error(
        'There may be no food item with this name. Choices are (burrito, sandwich, burger)'
      )

    case 'DRINK_NOT_FOUND':
      throw new Error(
        'There may be no drink item named at this! Choices are (sprite, coke, pepsi)'
      )

    default:
      throw new Error('Not a valid response was found')
  }
}
