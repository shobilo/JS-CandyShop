const User = require('./userModel')
const Role = require('../role/roleModel')

class UserRepository {
    async create(data) {
        const {email, password, name, surname, birthDate, address, phone} = data
        console.log(data)

        const user = await User.create({
            email: email,
            password: password,
            name: name,
            ...(surname && {surname}),
            ...(birthDate && {birthDate}),
            ...(address && {address}),
            ...(phone && {phone})
        })

        const [role, setRole] = await Role.findOrCreate({
            where: {
                name: "user"
            }
        })

        await user.addRole(role)
        await user.createBasket({state: "active"})

        return {
            user,
            role
        }
    }

    async readByEmail(email) {
        return await User.findOne({
            where: {email}
        })
    }
}

module.exports = new UserRepository()