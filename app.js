const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./config')


function connectDB() {
  try {
    mongoose.connect(process.env.BD, {useNewUrlParser: true, useUnifiedTopology: true}),
    console.log("Successfuly connected to DB")
  } catch(e) {
    console.log(e)
  }
}


const productRoutes = require('./controllers/products')
const userRoutes = require('./controllers/users')
const articleRoutes = require('./controllers/articles')


//***Middlewares****** *//

app.use(express.json())




//**********Routes***************

app.get('/', (req,res) => {
  res.send('good start')
})


app.use('/products', productRoutes)
app.use('/users', userRoutes)
app.use('/articles', articleRoutes)




app.get('*', (req,res) => {
  res.send("sorry page not found!")
})







connectDB()

module.exports = app
