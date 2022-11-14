const Sequelize = require(`sequelize`);

const sequelize = require(`../util/database`);

const CartItem = sequelize.define(`cartItems`, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
  quantity: Sequelize.INTEGER,
});

module.exports = CartItem;
