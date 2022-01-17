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


module.exports = router;