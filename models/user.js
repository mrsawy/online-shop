const Sequelize = require(`sequelize`);

const sequelize = require(`../util/database`);

const User = sequelize.define(`users`, {
  firstName: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = User;
