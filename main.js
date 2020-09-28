const dotenv = require('dotenv')
const app = require('./app')


if(process.env.NODE_ENV !== "production") {
  dotenv.config()
}

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.info(`port is open at gate ${port}`)
})
