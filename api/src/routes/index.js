const { Router } = require("express");
var bcrypt = require("bcryptjs");
const router = Router();
const { Usuario, Pelicula, Personaje, Genero } = require("../db.js");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const dataPeliculas = require("../data/peliculas.json");
const dataPersonajes = require("../data/personajes.json");
const dataGeneros = require("../data/generos.json");

// #region FUNCIONES AUTOMATICAS
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
crearPeliculasInDb();
crearPersonajesInDb();
crearGenerosInDb();
// #endregion

//#region RUTAS DE AUTH

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("Faltan datos de ingresar!");
    }
    const user = await Usuario.findOne({
      where: {
        email,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
      // user
      return res.status(200).json(user);
    }
    res.status(400).send("Credenciales Invalidas");
  } catch (error) {
    console.log(error);
  }
});

router.post("/auth/register", async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body;
    if (!(nombre && apellido && email && password)) {
      res.status(400).send("Faltan datos!");
    }
    const busquedaUsuario = await Usuario.findOne({
      where: {
        email: email,
      },
    });
    if (busquedaUsuario) {
      return res.status(409).send("El usuario ya existe!");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    // Create token

    const user = await Usuario.create({
      nombre: nombre,
      apellido: apellido,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // return new user
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});
// #endregion

//#region RUTAS DE CHARACTERS
router.post("/characters", async (req, res) => {
  res.status(200).send("Response OK");
});
router.get("/characters", async (req, res) => {
  res.status(200).send("Response OK");
});
router.put("/characters", async (req, res) => {
  res.status(200).send("Response OK");
});
router.delete("/characters", async (req, res) => {
  res.status(200).send("Response OK");
});
// #endregion

//#region RUTAS DE MOVIES
router.post("/movies", async (req, res) => {
  res.status(200).send("Response OK");
});
router.get("/movies", async (req, res) => {
  res.status(200).send("Response OK");
});
router.put("/movies", async (req, res) => {
  res.status(200).send("Response OK");
});
router.delete("/movies", async (req, res) => {
  res.status(200).send("Response OK");
});
//#endregion
module.exports = router;
