const Sequelize = require(`sequelize`);

const sequelize = require(`../util/database`);

const Cart = sequelize.define(`carts`);

module.exports = Cart;
