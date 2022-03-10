export const getAverageValue = (array) => {
  const sum = array.reduce((prevValue, curValue) => prevValue + curValue, 0)
  const result = sum / array.length

  return result
}