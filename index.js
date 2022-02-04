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
const server = require('./api/src/app.js');
const { conn } = require('./api/src/db.js');
//const chargeTempApiToDb = require('../api/src/routes/index')


//#region FUNCIONES AUTOMATICAS 
const { Usuario, Pelicula, Personaje, Genero } = require("./api/src/db.js");

const dataPeliculas = require("./api/src/json/peliculas.json");
const dataPersonajes = require("./api/src/json/personajes.json");
const dataGeneros = require("./api/src/json/generos.json");

function crearPeliculasInDb() {
  dataPeliculas.forEach(async (el) => {
    try {
      const verificacion = await Pelicula.findOne({
        where: { titulo: el.Titulo },
      });
      if (!verificacion) {
        await Pelicula.create({
          imagen: el.Imagen,
          titulo: el.Titulo,
          fecha_creacion: el.FechaDeCreacion,
          calificacion: el.Calificacion,
          genero: el.Genero,
        });
      }
    } catch (err) {
      console.log("error!", err);
    }
  });
}

function crearPersonajesInDb() {
  dataPersonajes.forEach(async (el) => {
    try {
      const verificacion = await Personaje.findOne({
        where: { nombre: el.Nombre },
      });
      if (!verificacion) {
        await Personaje.create({
          imagen: el.Imagen,
          nombre: el.Nombre,
          edad: el.Edad,
          peso: el.Peso,
          historia: el.Historia,
          peliculas_asociadas: el.PeliculasAsociadas,
        });
      }
    } catch (err) {
      console.log("error!", err);
    }
  });
}

function crearGenerosInDb() {
  dataGeneros.forEach(async (el) => {
    try {
      const verificacion = await Genero.findOne({
        where: { nombre: el.Nombre },
      });
      if (!verificacion) {
        await Genero.create({
          imagen: el.Imagen,
          nombre: el.Nombre,
          peliculas_asociadas: el.PeliculasAsociadas,
        });
      }
    } catch (err) {
      console.log("error!", err);
    }
  });
}

function ejecutarFunciones() {
  console.log('Funciones ejecutadas!')
  crearPeliculasInDb();
  crearPersonajesInDb();
  crearGenerosInDb();
}
//#endregion

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  //Aca se podria agregar las funciones que crean datos
  server.listen(3000, () => {
    console.log('Localhost listening at 3000'); // eslint-disable-line no-console
    ejecutarFunciones();
  })/* .catch(err => console.error(err)); */
});
// Here the server is starting to listen in port 3001