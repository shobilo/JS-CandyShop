const sequelize = require('../../db')
const {DataTypes} = require('sequelize')

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    state: {type: DataTypes.STRING },
    email: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    totalPrice: {type: DataTypes.DECIMAL(10, 2)},
    deliveryStartDate: {type: DataTypes.DATE},
    deliveryProcessDate: {type: DataTypes.DATE},
    deliveryEndDate: {type: DataTypes.DATE}
})

module.exports = Basket
