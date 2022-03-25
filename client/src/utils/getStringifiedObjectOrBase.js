export const getStringifiedObjectOrBase = (value) => {
  if (typeof value === "object" && value.type === undefined) {
    return JSON.stringify(value)
  }
  return value
}