const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const argon2 = require("argon2");
class User extends Model {
  checkPassword(loginPw) {
    return argon2.verify(this.password, loginPw);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        try {
          const hash = await argon2.hash(newUserData);
        } catch (err) {
          console.log(err);
        }
      },
      async beforeUpdate(updatedUserData) {
        try {
          const hash = await argon2.hash(newUserData);
        } catch (err) {
          console.log(err);
        }
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
