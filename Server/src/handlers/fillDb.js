const { fillDbController } = require('../controllers/fillDb')

const fillDb = async (req, res) => {
  const { body } = req
  const bodyItems = {
    fullName: body.full_name,
    phoneNumber: body.phone_number,
    startDate: body.start_date,
    preferredLanguage: body.preferred_language,
    howFound: body.how_found,
    newsletterSubscription: body.newsletter_subscription
  }
  try {
    const response = await fillDbController(bodyItems)

    if (!response) throw new Error('Error al llenar base de datos')
    res.status(200).send(response)
  } catch (error) {
    console.error(error)
    res.status(500).send(error.message)
  }
}

module.exports = fillDb
