"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reservation.init(
    {
      reserve_id: {
        type: DataTypes.STRING,
      },
      user_id: { type: DataTypes.STRING },
      transaction_id: { type: DataTypes.STRING },
      property_id: { type: DataTypes.STRING },
      quantity: { type: DataTypes.INTEGER },
      duration: { type: DataTypes.DOUBLE },
      layers: DataTypes.STRING,
      fullname: DataTypes.STRING,
      gender: DataTypes.STRING,
      country: DataTypes.STRING,
      state: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      dob: DataTypes.STRING,
      occupation: DataTypes.STRING,
      date: DataTypes.STRING,
      next_pay_date: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      interest: DataTypes.DOUBLE,
      total: DataTypes.DOUBLE,
      amount_paid: DataTypes.DOUBLE,
      payment_status: DataTypes.STRING,
      deleted: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Reservation",
    }
  );
  return Reservation;
};
