const { Responses } = require('../db')

const updateSurveyController = async (
  id,
  {
    fullName,
    phoneNumber,
    startDate,
    preferredLanguage,
    howFound,
    newsletterSubscription
  }
) => {
  console.log(id)
  try {
    const response = await Responses.update(
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

    if (response[0] > 0) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports = updateSurveyController
