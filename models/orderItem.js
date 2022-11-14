const Sequelize = require(`sequelize`);

const sequelize = require(`../util/database`);

const OrderItem = sequelize.define(`orderItems`, {
  id: { primaryKey: true, type: Sequelize.INTEGER },
});

module.exports = OrderItem;
