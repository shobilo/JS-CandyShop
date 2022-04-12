const User = require('./userModel')
const Role = require('../role/roleModel')
const Basket = require('../basket/basketModel')
const {Op} = require("sequelize");

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

        const [role] = await Role.findOrCreate({
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
    
    async readUserOrders(userData) {
        const {id} = userData
        return await Basket.findAll({
            where: {
                userId: id,
                state: {
                    [Op.ne]: "active"
                }
            },
            order: [["deliveryStartDate", "DESC"]],
        })
    }
    
    async readOrderById(orderData) {
        const {orderId} = orderData
    
        const order = await Basket.findOne({
            where: {
                id: orderId
            }
        })
    
        return order
    }
}

module.exports = new UserRepository()