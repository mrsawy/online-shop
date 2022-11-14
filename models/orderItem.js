const Sequelize = require(`sequelize`);

const sequelize = require(`../util/database`);

const OrderItem = sequelize.define(`orderItems`, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
  quantity: Sequelize.INTEGER,
});

module.exports = OrderItem;
