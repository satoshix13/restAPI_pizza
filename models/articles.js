const articleSchema = require('./schema/article-schema')
const mongoose = require('mongoose')


module.exports = mongoose.model('articles', articleSchema)
