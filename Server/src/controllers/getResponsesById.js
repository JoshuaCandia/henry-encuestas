const { Responses } = require('../db')

const getResponsesController = async id => {
  try {
    const response = await Responses.findByPk(id)

    if (!response) {
      throw new Error(
        `No se encontró ninguna respuesta con el ID proporcionado: ${id}`
      )
    }

    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = getResponsesController
