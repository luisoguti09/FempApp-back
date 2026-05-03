const { Sequelize } = require('sequelize');

/*const sequelize = new Sequelize('fempatin', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});*/

const conectionString = "mysql://root:CAtFaezrXbDgIiaknlKQZhCYaoMhKHjK@tramway.proxy.rlwy.net:16455/railway";
const sequelize = new Sequelize(conectionString, {
  dialect: 'mysql',
  logging: false, // Desactiva los logs de Sequelize
  dialectOptions: process.env.DATABASE_URL || {
    ssl: {
      rejectUnauthorized: false // Permite conexiones SSL sin verificar el certificado
    }
  }
});
 
module.exports = sequelize;
//mysql://root:CAtFaezrXbDgIiaknlKQZhCYaoMhKHjK@tramway.proxy.rlwy.net:16455/railway