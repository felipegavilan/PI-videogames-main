const { DataTypes} = require('sequelize');

module.exports = (sequelize) =>{
    //definimos el modelo
    sequelize.define('genre', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
        },
        name:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        }
    },{
        timestamps: false,
    })
}