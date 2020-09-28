const express = require('express')
const app = express()
const mongoose = require('mongoose')


function connectDB() {
  try {
    mongoose.connect('mongodb+srv://pizza_user:RIj39hLP72gEeDL3@cluster0.p8wqw.mongodb.net/Cluster0?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}),
    console.log("Successfuly connected to DB")
  } catch(e) {
    console.log(e)
  }
}



const productRoutes = require('./controllers/products')
const userRoutes = require('./controllers/users')



//***Middlewares****** *//

app.use(express.json())




//**********Routes***************

app.get('/', (req,res) => {
  res.send('good start')
})


app.use('/products', productRoutes)
app.use('/users', userRoutes)

app.get('*', (req,res) => {
  res.send("sorry page not found!")
})







connectDB()

module.exports = app
