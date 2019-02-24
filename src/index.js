const server = require('./server')

const PORT = process.env.PORT || 3031

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})
