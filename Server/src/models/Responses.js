const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define(
    'Responses',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          max: {
            args: [20],
            msg: 'El nombre no puede tener más de 20 letras.'
          }
        }
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      preferredLanguage: {
        type: DataTypes.STRING,
        allowNull: false
      },
      howFound: {
        type: DataTypes.STRING,
        allowNull: false
      },
      newsletterSubscription: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    { timestamps: false }
  )
}
