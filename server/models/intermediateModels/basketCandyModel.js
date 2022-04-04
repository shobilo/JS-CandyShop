const sequelize = require('../../db')
const {DataTypes} = require('sequelize')

const BasketCandy = sequelize.define('basketCandy', {
  quantity: {type: DataTypes.INTEGER}
})

module.exports = BasketCandy