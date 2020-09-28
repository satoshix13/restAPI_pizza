const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const md5 = require('md5')




 async function listUsers(req,res) {
  let users = await Users.find().exec()
  let filteredList = users.map((item) => {
    item = {...item.toJSON()}
    delete item.password
    return item
  })
  res.send(filteredList)
}


async function createUser(req,res) {
  req.body.password = md5(req.body.password)

  try {
    let newUser = await new Users(req.body).save()
    let createdUser = newUser.toJSON()
    delete createdUser.password
    res.status(201).json(createdUser)
  } catch (e) {
    console.info(e)
  }
}



async function getUser(req, res) {
  let userId = req.params.userId
  let foundItem = await Users.findById(userId).exec()

  if(!foundItem){
    res.status(404).json({ message: "user wasn't found"})
  }
  let foundUser = foundItem.toJSON()
  delete foundUser.password
  res.json(foundUser)
}


async function updateUser(req,res) {
  let userId = req.params.userId
  let updatedFields = req.body

  let foundUser = await Users.findOneAndUpdate({_id: userId}, updatedFields, {new: true}).exec()

  if(!foundUser) {
    res.status(404).json({ message: "user not found"})
  }

  if(foundUser) {
    let updatedUser = foundUser.toJSON()
    delete updatedUser.password
    res.json(updatedUser)
  }
}


async function deleteUser(req,res) {
  let userId = req.params.userId

  try {
    let deleted = await Users.findOneAndDelete({_id: userId})
    res.json({message: "product was successfully deleted"})
  } catch (e) {
    console.info(e)
    res.status(404).json({ message: "user not found or cant' be deleted"})
  }
}




router.route('/')
      .get(listUsers)
      .post(createUser)


router.route('/:userId')
      .get(getUser)
      .put(updateUser)
      .delete(deleteUser)




module.exports = router
