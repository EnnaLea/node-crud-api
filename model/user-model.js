import {DataTypes} from "sequelize";
import db from "../util/db.js";

const User = db.define(
    'User', 
    {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
});

export default User