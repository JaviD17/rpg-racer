const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const argon2 = require("argon2");
class User extends Model {
  async checkPassword(loginPw) {
    try {
      let verifiedPw = await argon2.verify(this.password, loginPw);
      if (verifiedPw) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
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
          newUserData.password = await argon2.hash(newUserData.password, {
            type: argon2.argon2id,
          });
          return newUserData;
        } catch (err) {
          console.log(err);
        }
      },
      async beforeUpdate(updatedUserData) {
        try {
          updatedUserData.password = await argon2.hash(
            updatedUserData.password,
            { type: argon2.argon2id }
          );
          return updatedUserData;
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
