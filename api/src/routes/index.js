const { Router } = require("express");
var bcrypt = require("bcryptjs");
const router = Router();
const { Usuario, Pelicula, Personaje, Genero } = require("../db.js");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const dataPeliculas = require("../json/peliculas.json");
const dataPersonajes = require("../json/personajes.json");
const dataGeneros = require("../json/generos.json");

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
        { userid: user.id, email },
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
      return res.status(409).send("Email ya registrado!");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    // Create token

    const user = await Usuario.create({
      nombre: nombre,
      apellido: apellido,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign({ userid: user.id, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    user.token = token;
    // return new user
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});
// #endregion

//#region RUTAS DE CHARACTERS
router.post("/characters", auth, async (req, res) => {
  try {
    const { Imagen, Nombre, Edad, Peso, Historia, Peliculas_asociadas } =
      req.body;
    if (
      !(Nombre && Edad && Peso && Historia && Peliculas_asociadas && Imagen)
    ) {
      res.status(400).send("Faltan datos!");
    }
    const personaje = await Personaje.create({
      imagen: Imagen,
      nombre: Nombre,
      edad: Edad,
      peso: Peso,
      historia: Historia,
      peliculas_asociadas: Peliculas_asociadas,
    });
    res.status(201).json(personaje);
  } catch (error) {
    console.log(error);
  }
});
router.get("/characters", async (req, res) => {
  const name = req.query.name;
  const age = req.query.age;
  const movies = req.query.movies;
  if (name) {
    const personajeEncontradoPorName = await Personaje.findAll({
      where: {
        nombre: name,
      },
    });
    if (personajeEncontradoPorName.length !== 0) {
      return res.status(201).json(personajeEncontradoPorName);
    } else {
      return res.status(202).send("No se encontro el personaje!");
    }
  } else if (age) {
    const personajeEncontradoPorAge = await Personaje.findAll({
      where: {
        edad: age,
      },
    });
    if (personajeEncontradoPorAge.length !== 0) {
      return res.status(201).json(personajeEncontradoPorAge);
    } else {
      return res.status(202).send("No se encontro el personaje!");
    }
  } else if (movies) {
    console.log("movies", personajeEncontradoPorMovies);
    const personajeEncontradoPorMovies = await Personaje.findAll({
      where: {
        peliculas_asociadas: movies,
      },
    });
    if (personajeEncontradoPorMovies.length !== 0) {
      return res.status(201).json(personajeEncontradoPorMovies);
    } else {
      return res.status(202).send("No se encontro el personaje!");
    }
  } else {
    const personajeEncontrados = await Personaje.findAll();
    return res.status(201).json(personajeEncontrados);
  }
});
router.put("/characters", async (req, res) => {
  try {
    const { id } = req.body;
    const { Imagen, Nombre, Edad, Peso, Historia, Peliculas_asociadas } =
      req.body;
    const personaje = await Personaje.update(
      {
        imagen: Imagen,
        nombre: Nombre,
        edad: Edad,
        peso: Peso,
        historia: Historia,
        peliculas_asociadas: Peliculas_asociadas,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(201).json(personaje);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/characters", async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      res.status(400).send("Faltan datos!");
    }
    const personaje = await Personaje.findOne({
      where: {
        id: id,
      },
    });
    if (!personaje) {
      res.status(404).send("No se encontro el personaje!");
    } else if (personaje.peliculas_asociadas.length !== 0) {
      await personaje.destroy();
      res.status(204).send("Personaje eliminado!");
    }
  } catch (error) {
    console.log(error);
  }
});
// #endregion

//#region RUTAS DE MOVIES
router.post("/movies", async (req, res) => {
  try {
    const { Imagen, Titulo, Fecha_creacion, Calificacion, Genero } = req.body;
    if (!(Titulo && Fecha_creacion && Calificacion && Imagen, Genero)) {
      res.status(400).send("Faltan datos!");
    }
    const pelicula = await Pelicula.create({
      imagen: Imagen,
      titulo: Titulo,
      fecha_creacion: Fecha_creacion,
      calificacion: Calificacion,
      genero: Genero,
    });
    res.status(201).json(pelicula);
  } catch (error) {
    console.log(error);
  }
});
router.get("/movies", async (req, res) => {
  const name = req.query.name;
  const genre = req.query.genre;
  const order = req.query.order;
  if (name) {
    const peliculaEncontradaPorName = await Pelicula.findAll({
      where: {
        titulo: name,
      },
    });
    if (peliculaEncontradaPorName.length !== 0) {
      return res.status(201).json(peliculaEncontradaPorName);
    } else {
      return res.status(202).send("No se encontro la pelicula!");
    }
  } else if (genre) {
    const peliculaEncontradaPorGenre = await Pelicula.findAll({
      where: {
        genero: genre,
      },
    });
    if (peliculaEncontradaPorGenre.length !== 0) {
      return res.status(201).json(peliculaEncontradaPorGenre);
    } else {
      return res.status(202).send("No se encontro la pelicula!");
    }
  } else if (order) {
    if (order === "asc" || order === "desc") {
      const peliculasEncontradas = await Pelicula.findAll({
        order: [["titulo", order]],
      });
      return res.status(201).json(peliculasEncontradas);
    } else {
      return res.status(202).send("El orden no es valido!");
    }
  } else {
    const peliculasEncontradas = await Pelicula.findAll({
      include: {
        model: Personaje,
        attributes: ["nombre"],
        through: {
          attributes: ["peliculas_asociadas"],
        },
      },
    });
    return res.status(201).json(peliculasEncontradas);
  }
});
router.put("/movies", async (req, res) => {
  try {
    const { id } = req.body;
    const { Imagen, Titulo, Fecha_creacion, Calificacion } = req.body;
    const pelicula = await Pelicula.update(
      {
        imagen: Imagen,
        titulo: Titulo,
        fecha_creacion: Fecha_creacion,
        calificacion: Calificacion,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(201).json(pelicula);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/movies", async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      res.status(400).send("Faltan datos!");
    }
    const pelicula = await Pelicula.findOne({
      where: {
        id: id,
      },
    });
    if (!pelicula) {
      res.status(404).send("No se encontro la pelicula!");
    } else {
      await pelicula.destroy();
      res.status(204).send("Pelicula eliminada!");
    }
  } catch (error) {
    console.log(error);
  }
});
//#endregion
module.exports = router;
