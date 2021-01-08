const { Meme } = require('../models')

module.exports = {
  async index(req, res) {
    try {
      const meme = await Meme.findAll({
        limit: 10
      })
      res.send(meme)
    } catch (err) {
      res.status(400).send({
        error: 'Error fetch meme'
      })
    }
  },
  async show(req, res) {
    try {
      const meme = await Meme.findByPk(req.params.memeId)
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
  },
  async search (req, res) {
    try {
      let memes = null
      const userId = req.query.userId
      if (userId) {
        memes = await Meme.findAll({
          where: {
            UserId : userId
          }
        })
      } else {
        memes = null
      }
      res.send(memes)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the memes ?'
      })
    }
  }
}