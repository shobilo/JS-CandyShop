import moment from "moment";

export const getPrettyDate = (date) => {
  if (date) {
    return moment(date).format("MMMM Do YYYY, h:mm:ss a")
  }
  return "No date"
}