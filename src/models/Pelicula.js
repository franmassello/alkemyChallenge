const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pelicula', {
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
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    calificacion: { 
        type: DataTypes.FLOAT,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });
};