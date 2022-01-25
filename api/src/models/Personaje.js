const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('personaje', {
    id:{
      type: DataTypes.UUID, //Unique ID 
      defaultValue: DataTypes.UUIDV4, // Genera el id
      allowNull: false,
      primaryKey: true
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    peso: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    historia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    peliculas_asociadas: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
  });
};