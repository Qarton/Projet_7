const { Meme, User, Comment} = require('../models')

module.exports = {
  // Affichage de tout les Memes
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
  // Affichage du détail d'un Meme et de ses commentaires
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
  //Enregistrement d'un Meme
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