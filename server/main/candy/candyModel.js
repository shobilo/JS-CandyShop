const sequelize = require('../../db')
const {DataTypes} = require('sequelize')

module.exports = sequelize.define('candy', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    prevCandyRef: {type: DataTypes.INTEGER, defaultValue: null},
})