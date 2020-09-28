const express = require('express')
const router = express.Router()
const Articles = require('../models/articles')
const slugify = require('slugify')


async function listArticles(req,res){
  let list = await Articles.find().exec()
  res.json(list)
}


async function createArticle(req,res){
 let article = req.body
 article.slug = slugify(article.title)
 article.excerpt = article.body.substring(0,20)+"...."

  try {
    let newArticle = await new Articles(article).save()
    res.status(201).json(newArticle)
  } catch (e) {
    res.status(400).json({message: e})
  }
}


async function getArticle(req,res) {
  let articleId = req.params.articleId
  let article = await Articles.findById({_id: articleId}).exec()

  if(!article){
    res.status(404).json({message: "can't be found"})
  }

  res.json(article)
}


async function updateArticle(req,res) {
  let articleId = req.params.articleId
  let updatedFields = req.body

  try {
    let article = await Articles.findOneAndUpdate({_id:articleId}, updatedFields, {new: true}).exec()
    if(!article) {
      res.status(404).json({ message: "article can't be found"})
    }
    res.json(article)
  } catch (e) {
    res.status(400).json({ message: e})
  }
}


async function deleteArticle(req,res) {
  let searchId = req.params.id

  let foundItem = await Articles.findOneAndDelete({ _id: searchId }).exec()

  if (!foundItem) {
      res.status(404).json({ message: 'article doesnt exist' })
      return
  }

  res.status(204).json()
}


router.route('/')
      .get(listArticles)
      .post(createArticle)


router.route('/:articleId')
      .get(getArticle)
      .put(updateArticle)
      .delete(deleteArticle)





module.exports = router
