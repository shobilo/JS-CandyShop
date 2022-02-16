const sequelize = require('../../db')
const {DataTypes} = require('sequelize')

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    state: {type: DataTypes.STRING }
})

module.exports = Basket
