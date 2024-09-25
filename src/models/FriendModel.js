import { sequelize } from "../DB/conexion.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./UserModel.js";

export const FriendModel = sequelize.define('friends',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    apodo: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    timestamps: false
});

UserModel.hasMany(FriendModel, {as:'enlaceU', foreignKey: 'user_id'});
FriendModel.belongsTo(UserModel, {as:'enlaceU', foreignKey: 'user_id'});

UserModel.hasMany(FriendModel, {as:'enlaceF', foreignKey: 'friend_id'});
FriendModel.belongsTo(UserModel, {as:'enlaceF', foreignKey: 'friend_id'});

