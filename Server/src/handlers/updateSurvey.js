const updateSurveyController = require('../controllers/updateSurvey')

const updateSurvey = async (req, res) => {
  try {
    const id = req.params.id

    const updated = await updateSurveyController(id, req.body)

    if (updated) {
      res.status(200).json({ message: 'Registro actualizado exitosamente' })
    } else {
      res
        .status(404)
        .json({ error: 'No se encontró el registro con la ID proporcionada' })
    }
  } catch (error) {
    console.error(error)
    res.status(400).send(error)
  }
}

module.exports = updateSurvey
