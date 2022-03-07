const sequelize = require('../../db')
const {DataTypes} = require('sequelize')

const Candy = sequelize.define('candy', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
    imageName: {type: DataTypes.STRING, allowNull: true},
    imageData: {type: DataTypes.BLOB, allowNull: true},
    prevCandyRef: {type: DataTypes.INTEGER, defaultValue: null},
})

module.exports = Candy