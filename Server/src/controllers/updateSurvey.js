const { Responses } = require('../db')

const updateSurveyController = async (id, data) => {
  const {
    fullName,
    phoneNumber,
    startDate,
    preferredLanguage,
    howFound,
    newsletterSubscription
  } = data
  console.log(data)
  try {
    const userEdit = await Responses.findByPk(id)
    const update = await userEdit.update({
      fullName,
      phoneNumber,
      startDate,
      preferredLanguage,
      howFound,
      newsletterSubscription
    })
    console.log(update)
    return true
    /* const response = await Responses.update(
      {
        fullName,
        phoneNumber,
        startDate,
        preferredLanguage,
        howFound,
        newsletterSubscription
      },
      {
        where: { id }
      }
    )

    if (response[1] && response[0] > 0) {
      return true
    } else {
      throw new Error('No se pudo actualizar el registro')
    } */
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports = updateSurveyController
