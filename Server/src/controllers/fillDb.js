const { Responses } = require('../db')

const fillDbController = async ({
  fullName,
  phoneNumber,
  startDate,
  preferredLanguage,
  howFound,
  newsletterSubscription
}) => {
  try {
    const response = await Responses.create({
      fullName,
      phoneNumber,
      startDate,
      preferredLanguage,
      howFound,
      newsletterSubscription
    })
    return response
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports = {
  fillDbController
}
