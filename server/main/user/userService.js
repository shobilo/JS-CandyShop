const bcrypt = require('bcrypt')
const userRepository = require('./userRepository')
const ApiError = require('../../helpers/ApiError')
const generateJwt = require('../../helpers/generateJwt')

class UserService {
    async registration(data) {
        const {email, password} = data

        const candidate = await userRepository.readByEmail(email)

        if (candidate) {
            throw ApiError.badRequest("This email is already used in the system")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        try {
            const {user, role} = await userRepository.create({
                ...data,
                password: hashedPassword
            })
    
            const jwtPayload = {
                id: user.id,
                email: user.email,
                name: user.name,
                surname: user.surname,
                phone: user.phone,
                address: user?.address || "",
                roles: roles,
            }
    
            const token = generateJwt(jwtPayload)
    
            return token
        } catch (error) {
            throw ApiError.internal(error.message)
        }

    }

    async login(data) {
        const {email, password} = data

        const user = await userRepository.readByEmail(email)

        if (!user) {
            throw ApiError.badRequest("No such email in database")
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password)

        if(!isPasswordCorrect) {
            throw ApiError.badRequest("The password is not true")
        }

        const roles = await user.getRoles()

        const jwtPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            address: user?.address || "",
            roles: roles
        }

        const token = generateJwt(jwtPayload)

        return token
    }

    async auth({email}) {
        const user = await userRepository.readByEmail(email)

        const roles = await user.getRoles()
    
        const jwtPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            address: user?.address || "",
            roles: roles
        }

        const token = generateJwt(jwtPayload)

        return token
    }
    
    async readUserOrders(userData) {
        return await userRepository.readUserOrders(userData)
    }
    
    async readOrderById(orderData) {
        const order = await userRepository.readOrderById(orderData)
        const orderObject = order.get({plain: true})
    
        const orderCandies = await order.getCandies()
    
        const orderCandiesObjectsArray = orderCandies.map((candy) => {
            const candyObject = candy.get({ plain: true})
            const quantity = candyObject.basketCandy.quantity
        
            delete candyObject.basketCandy
        
            return {
                candy: candyObject,
                quantity: quantity
            }
        })
    
        const totalPrice = orderCandiesObjectsArray.reduce((accum, currValue) => {
            return accum + (+currValue.candy.price * currValue.quantity)
        }, 0)
    
        const totalPriceRounded = Math.ceil((totalPrice)*100)/100
    
        return {
            details: orderObject,
            candies: orderCandiesObjectsArray,
            totalPrice: totalPriceRounded
        }
    }
}

module.exports = new UserService()