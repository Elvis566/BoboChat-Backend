import { sequelize } from "../DB/conexion.js";
import { DataTypes } from "sequelize";
import { ChatModel } from "./ChatModel";
import { UserModel } from "./UserModel";

export const MessageModel = sequelize.define('messages',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

ChatModel.hasMany(MessageModel, {as:'enlaceC', foreignKey: 'chat_id'})
MessageModel.belongsTo(ChatModel, {as:'enlaceC', foreignKey: 'chat_id'})

UserModel.hasMany(MessageModel, {as: 'enlaceUser', foreignKey:'user_id'})
MessageModel.belongsTo(UserModel, {as:'enlaceUser', foreignKey:'user_id'})