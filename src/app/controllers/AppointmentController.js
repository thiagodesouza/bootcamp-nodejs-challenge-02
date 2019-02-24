const { User, Appointment } = require('../models')

class AppointmentController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)

    return res.render('appointments/create', { provider })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    })

    req.flash('success', 'Appointment has been created')
    return res.redirect('/app/dashboard')
  }

  async destroy (req, res) {
    const { id } = req.params

    await Appointment.destroy({
      where: { id }
    })

    req.flash('success', 'Appointment has been removed')
    return res.redirect('/app/dashboard')
  }
}

module.exports = new AppointmentController()
