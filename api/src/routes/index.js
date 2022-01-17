const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { combineTableNames } = require('sequelize'); // sequelize/types/lib/utils
const { noExtendLeft } = require('sequelize'); // /types/lib/operators
const router = Router();

// Configurar los routers

router.get('/disney', async(req,res) =>{
    res.status(200).send("Response OK")
})

//RUTAS DE AUTH
router.post("/auth/login", async(req,res) =>{
    res.status(200).send("Response OK")
})

router.post("/auth/register", async(req,res) =>{
    res.status(200).send("Response OK")
})

//RUTAS DE CHARACTERS
router.post("/characters", async(req,res) =>{
    res.status(200).send("Response OK")
})
router.get("/characters", async(req,res) =>{
    res.status(200).send("Response OK")
})
router.put("/characters", async(req,res) =>{
    res.status(200).send("Response OK")
})
router.delete("/characters", async(req,res) =>{
    res.status(200).send("Response OK")
})

//RUTAS DE MOVIES
router.post("/movies", async(req,res) =>{
    res.status(200).send("Response OK")
})
router.get("/movies", async(req,res) =>{
    res.status(200).send("Response OK")
})
router.put("/movies", async(req,res) =>{
    res.status(200).send("Response OK")
})
router.delete("/movies", async(req,res) =>{
    res.status(200).send("Response OK")
})
module.exports = router;