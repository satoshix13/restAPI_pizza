const config = require('./config')
const app = require('./app')


const port = process.env.PORT || 8000

app.listen(port, () => {
  console.info(`port is open at gate ${port}`)
})


