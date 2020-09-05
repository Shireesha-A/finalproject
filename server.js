const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Blog.find().sort({ createdAt: 'desc' })
  res.render('articles/mainpage', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(3001)