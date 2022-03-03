const roleCheck = (rolesArray, role) => {
  let isRole = false

  rolesArray.forEach(arrayRole => {
    if (arrayRole.name === role) {
      isRole = true
    }
  })

  return isRole
}

export default roleCheck