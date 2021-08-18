const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const argon2 = require("argon2");
class User extends Model {
  async checkPassword(loginPw) {
    let verifiedPassword = await argon2.verify(this.password, loginPw);
    return verifiedPassword;
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
          console.log(`THIS PASSWORD IS ${newUserData.password}`);
        try {
          newUserData.password = await argon2.hash(newUserData.password);
          console.log(`THIS PASSWORD IS ${newUserData.password}`);
          return newUserData;
        } catch (err) {
          console.log(err);
        }
      },
      async beforeUpdate(updatedUserData) {
          let { username, email, password } = updatedUserData;
        try {
          let hashedPw = await argon2.hash(password);
          return hashedPw;
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
