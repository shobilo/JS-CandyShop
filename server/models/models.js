const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    birthDate: {type: DataTypes.DATE},
})

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, uniquAdmie: true, allowNull: false}
})

const UserRole = sequelize.define('userRole', {

})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    state: {type: DataTypes.STRING }
})

const Candy = sequelize.define('candy', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
    prevCandyRef: {type: DataTypes.INTEGER, defaultValue: null},
})

const Property = sequelize.define('property', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
}, {
    indexes: [
        {
            unique: true,
            fields: ['name', 'description']
        }
    ]
})

const BasketCandy = sequelize.define('basketCandy', {

})

const CandyProperty = sequelize.define('candyProperty', {
    
})

const Rating = sequelize.define('rating', {
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const TypeBrand = sequelize.define('typeBrand', {
})


User.belongsToMany(Role, {through: UserRole})
Role.belongsToMany(User, {through: UserRole})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.belongsToMany(Candy, {through: BasketCandy})
Candy.belongsToMany(Basket, {through: BasketCandy})

User.hasMany(Rating)
Rating.belongsTo(User)

Candy.hasMany(Rating)
Rating.belongsTo(Candy)

Candy.belongsToMany(Property, {through: CandyProperty})
Property.belongsToMany(Candy, {through: CandyProperty})

Type.hasMany(Candy)
Candy.belongsTo(Type)

Brand.hasMany(Candy)
Candy.belongsTo(Brand)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

module.exports = {
    User,
    UserRole,
    Role,
    Basket,
    BasketCandy,
    Candy,
    CandyProperty,
    Property,
    Rating,
    Type,
    Brand,
    TypeBrand,
}