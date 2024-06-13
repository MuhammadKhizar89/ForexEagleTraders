const mysql = require('mysql2');
function connectToDatabase() {
  const connection = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    port: 3306,
    user: 'sql12713834',
    password: 'NRx4Wm3T3I',
    database: 'sql12713834'
  });
  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
    } else {
      console.log('Connected to MySQL database!');
    }
  });
  return connection;
}
// function connectToDatabase() {
//   const connection = mysql.createConnection({
//     host: 'mysql-2d0dc2fa-lhr-6c32.b.aivencloud.com',
//     port: 19064,
//     user: 'avnadmin',
//     password: 'AVNS_I9y4f1-bKtjU9vNJ5g5',
//     database: 'ForexTrading'
//   });
//   connection.connect((error) => {
//     if (error) {
//       console.error('Error connecting to MySQL database:', error);
//     } else {
//       console.log('Connected to MySQL database!');
//     }
//   });
//   return connection;
// }

module.exports = connectToDatabase;