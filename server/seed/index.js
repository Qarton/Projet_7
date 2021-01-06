const {
  sequelize,
  Meme,
  User,
  Comment
} = require('../models')

const delay = require('delay')
const Promise = require('bluebird')
const memes = require('./memes.json')
const users = require('./users.json')
const comments = require('./comments.json')

sequelize.sync({force: true})
  .then( async function () {
    await Promise.all(
      users.map(users => {
        User.create(users)
      })
    )

    await Promise.all(
      memes.map(memes => {
        Meme.create(memes)
      })
    )

    await delay(1000)

    await Promise.all(
      comments.map(comments => {
        Comment.create(comments)
      })
    )
  })