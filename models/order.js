const Sequelize = require(`sequelize`);

const sequelize = require(`../util/database`);

const Order = sequelize.define(`orders`,{});

module.exports = Order;
