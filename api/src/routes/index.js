const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
var bcrypt = require("bcryptjs");
const { combineTableNames } = require("sequelize"); // sequelize/types/lib/utils
const { noExtendLeft } = require("sequelize"); // /types/lib/operators
const router = Router();
const { Usuario } = require("../db");
const jwt = require("jsonwebtoken");

const auth = require("./middleware/auth");

router.get("/disney", auth, (req, res) => {
  res.status(200).send("Respuesta OK");
});

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
