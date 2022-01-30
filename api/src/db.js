require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { create } = require("domain");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/disney`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

console.log(`URL obtenida del archivo .env:  postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/disney` );


async function testDBConection() {
  try {
    await sequelize.authenticate();
    console.log(`Conexion con la base de datos establecida!` );
  } catch (error) {
    console.error("No es posible conectarse a la base de datos!:", error);
  }
}
testDBConection()
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

const { Usuario, Pelicula, Personaje, Genero } = sequelize.models;

Personaje.belongsToMany(Pelicula, { through: "personaje_pelicula" });
Pelicula.belongsToMany(Personaje, { through: "personaje_pelicula" });

Genero.belongsToMany(Pelicula, { through: "genero_pelicula" });
Pelicula.belongsToMany(Genero, { through: "genero_pelicula" });


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
