export const removeArrayItem = (index, array) => [...array.slice(0, index), ...array.slice(index + 1)]
