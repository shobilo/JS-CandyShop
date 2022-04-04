const sequelize = require('../../db')
const {DataTypes} = require('sequelize')

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    state: {type: DataTypes.STRING },
    deliveryStartDate: {type: DataTypes.DATE},
    deliveryProcessDate: {type: DataTypes.DATE},
    deliveryEndDate: {type: DataTypes.DATE}
})

module.exports = Basket
