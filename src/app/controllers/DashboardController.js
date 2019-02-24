const { User, Appointment } = require('../models')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    const { id, provider: isProvider } = req.session.user

    if (!isProvider) {
      const providers = await User.findAll({
        where: { provider: true }
      })
      return res.render('dashboard', { providers })
    }

    const appointments = await Appointment.findAll({
      where: { provider_id: id },
      include: [
        {
          model: User,
          association: 'client'
        }
      ],
      order: ['date']
    })

    const result = []

    appointments.forEach(appointment => {
      const currentDate = moment()
      const itemDate = moment(appointment.date)

      if (
        itemDate.date() === currentDate.date() &&
        itemDate.hour() > currentDate.hour()
      ) {
        result.push({
          id: appointment.id,
          client_avatar: appointment.client.avatar,
          client_name: appointment.client.name,
          time: itemDate.format('HH:mm')
        })
      }
    })

    return res.render('dashboard', { appointments: result })
  }
}

module.exports = new DashboardController()
