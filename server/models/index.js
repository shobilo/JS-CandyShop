const User = require("../main/user/userModel")
const Role = require("../main/role/roleModel")
const UserRole = require("./intermediateModels/userRoleModel")
const Basket = require("./intermediateModels/basketModel")
const Candy = require("../main/candy/candyModel")
const Property = require("../main/property/propertyModel")
const BasketCandy = require("./intermediateModels/basketCandyModel")
const CandyProperty = require("./intermediateModels/candyPropertyModel")
const Rating = require("./intermediateModels/ratingModel")
const Type = require("../main/type/typeModel")
const Brand = require("../main/brand/brandModel")

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