const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  sequelize.define(
    'Responses',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
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
