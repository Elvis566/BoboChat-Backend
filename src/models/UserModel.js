import { sequelize } from "../DB/conexion.js";
import { DataTypes } from "sequelize";
import { AvatarModel } from "./AvatarModel.js";
export const UserModel = sequelize.define('users',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    apodo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    timestamps: false
});

AvatarModel.hasMany(UserModel, {as: 'enlaceA', foreignKey: 'avatar_id'});
UserModel.belongsTo(AvatarModel, {as: 'enlaceA', foreignKey: 'avatar_id'});



