const { Meme, User, Comment} = require('../models')

module.exports = {
  async index(req, res) {
    try {
      const meme = await Meme.findAll()
      res.send(meme)
    } catch (err) {
      res.status(400).send({
        error: 'Error fetch meme'
      })
    }
  },
  async show(req, res) {
    try {
      const meme = await Meme.findByPk(req.params.memeId,{include: Comment})
      res.send(meme)
    } catch (err) {
      res.status(400).send({
        error: 'Error fetch meme'
      })
    }
  },
  async post(req, res) {
    try {
      const meme = await Meme.create(req.body)
      res.send(meme)
    } catch (err) {
      res.status(400).send({
        error: 'Error creating Meme'
      })
    }
  }
}