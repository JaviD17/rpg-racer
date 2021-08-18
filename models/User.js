const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { scrypt, randomFill, createCipheriv } = await import("crypto");

const algorithm = "aes-192-cbc";
class User extends Model {
  // check password with method checkPassword(loginPw) { return; };
  checkPassword(loginPw) {
    return; // bcrypt.compareSync(loginPw, this.password);
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
        // newUserData.password = await bcrypt.hash(newUserData.password, 10);
        // return newUserData;
        newUserData.password = await scrypt(
          newUserData.password,
          "salt",
          24,
          (err, key) => {
            if (err) throw err;

            randomFill(new Uint8Array(16), (err, iv) => {
              if (err) throw err;

              const cipher = createCipheriv(algorithm, key, iv);

              let encrypted = cipher.update(
                "some clear text data",
                "utf8",
                "hex"
              );
              encrypted += cipher.final("hex");
              console.log(encrypted);
            });
          }
        );
      },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
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
