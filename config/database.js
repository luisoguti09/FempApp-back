const { Sequelize } = require('sequelize');

/*const sequelize = new Sequelize('fempatin', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});*/
const sequelize = new Sequelize('railway', 'root', 'CAtFaezrXbDgIiaknlKQZhCYaoMhKHjK', {
  host: 'tramway.proxy.rlwy.net',
  port: 16455,
  dialect: 'mysql',
  logging: false, // Desactiva los logs de Sequelize
});
 
module.exports = sequelize;
//mysql://root:CAtFaezrXbDgIiaknlKQZhCYaoMhKHjK@tramway.proxy.rlwy.net:16455/railway