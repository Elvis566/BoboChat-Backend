import { sequelize } from "../DB/conexion.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./UserModel.js";


export const ChatModel = sequelize.define('chats',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull:false
    }
},{
    timestamps: false
});

UserModel.hasMany(ChatModel, {as:'enlaceOne', foreignKey: 'user_one_id'});
ChatModel.belongsTo(UserModel, {as:'enlaceOne', foreignKey: 'user_one_id'});

UserModel.hasMany(ChatModel, {as:'enlaceTwo', foreignKey: 'user_two_id'});
ChatModel.belongsTo(UserModel, {as:'enlaceTwo', foreignKey: 'user_two_id'});



