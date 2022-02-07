//#region FUNCIONES AUTOMATICAS 
const { Usuario, Pelicula, Personaje, Genero } = require("../db.js");

const dataPeliculas = require("../json/peliculas.json");
const dataPersonajes = require("../json/personajes.json");
const dataGeneros = require("../json/generos.json");

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

module.exports = {
    ejecutarFunciones
};