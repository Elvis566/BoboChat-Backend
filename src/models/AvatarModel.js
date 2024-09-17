import { sequelize } from "../DB/conexion.js";
import { DataTypes } from "sequelize";

export const AvatarModel = sequelize.define('avatars',{
    id:{ 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
})