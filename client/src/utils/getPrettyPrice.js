export const getPrettyPrice = (price, quantity) => {
  return Math.ceil((price * quantity)*100)/100
}