const Sequelize = require(`sequelize`);

const sequelize = new Sequelize(`node_complete`, `root`, `Dfg456h7j8!`, {
  host: `localhost`,
  dialect: `mysql`,
});


module.exports = sequelize ;
