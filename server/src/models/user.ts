import { Model, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

    declare id: CreationOptional<string>;
    declare firstname: string;
    declare lastname: string;
    declare email: string;
    declare password: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    declare static associations: {
    };
  }


  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    paranoid: true,
    tableName: 'users',
    sequelize
  });
  return User;
};