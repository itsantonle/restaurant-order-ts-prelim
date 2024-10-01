export function errorMessage(error?: string) {
  switch (error) {
    case 'INVALID_INPUT':
      throw new Error('One or many of your inputs may have been invalid')
      break
    case 'CLASS_NOT_FOUND':
      throw new Error(
        'There may be no food item with this name. Choices are (burrito, sandwich, burger)'
      )
      break
    default:
      throw new Error('Something went wrong')
  }
}
