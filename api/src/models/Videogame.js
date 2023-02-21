const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID, //generador universal unico en todo el mundo todo el tiempo
      defaultValue: DataTypes.UUIDV4, //version 4
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released:{
      type: DataTypes.DATEONLY, //fecha sin horas
    },
    rating:{
      type: DataTypes.FLOAT //num con decimales finitos
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING), //almacenar matriz de string
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    created:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },{
    timestamps: false,
  });
};

