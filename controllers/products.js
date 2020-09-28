const express = require('express')
const router = express.Router()
const Products = require('../models/products')




 async function listProducts(req,res) {
  let products = await Products.find().exec()
  res.send(products)
}


async function createProduct(req,res) {
  let newProduct = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    featured: req.body.featured,
    enabled: req.body.enabled
  }

  try {
   let item = await new Products(newProduct).save()
   res.status(201).json(item)
  } catch (e) {
    console.log(e)
    res.status(400).json({ message: "cant' create a new product"})
  }
}


async function getProduct(req, res) {
  let productId = req.params.productId
  let foundProduct = await Products.findById(productId)

  if(!foundProduct){
    res.status(404).json({ message: "product wasn't found"})
  }
  if(foundProduct){
    res.send(foundProduct)
  }
}


async function updateProduct(req,res) {
  let productId = req.params.productId

  let updatedProduct = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    featured: req.body.featured,
    enabled: req.body.enabled
  }

  try {
    let updated = await Products.findOneAndUpdate({_id:productId}, updatedProduct).exec()
    res.json(updated)
  } catch (e) {
    console.info(e)
    res.status(404 || 500).json({ message: "can't update product"})
  }
}


async function deleteProduct(req,res) {
  let productId = req.params.productId

  try {
    let deleted = await Products.findOneAndDelete({_id: productId})
    res.json({message: "product was successfully deleted"})
  } catch (e) {
    console.info(e)
    res.status(404).json({ message: "product not found or cant' be deleted"})
  }
}




router.route('/')
      .get(listProducts)
      .post(createProduct)


router.route('/:productId')
      .get(getProduct)
      .put(updateProduct)
      .delete(deleteProduct)




module.exports = router
