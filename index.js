//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const autoFunciones = require('./src/utils/autoFunctions.js');
const ejecutarAutoFunciones = autoFunciones.ejecutarFunciones;


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  //Aca se podria agregar las funciones que crean datos
  server.listen(3000, () => {
    console.log('Localhost listening at 3000'); // eslint-disable-line no-console
    ejecutarAutoFunciones();
  })/* .catch(err => console.error(err)); */
});
// Here the server is starting to listen in port 3001