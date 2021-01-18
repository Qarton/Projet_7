const { Meme, User, Comment} = require('../models')
const fs = require('fs')

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
      // const meme = await Meme.create(req.body)
      let imageUrl
      let title = req.body.title
      let owner = req.user.firstName + ' ' + req.user.name
      let UserId = req.user.id
      console.log(req.body)
      if (req.file != undefined) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
      else {
        imageUrl == null
      }
      if ((title == 'null' && imageUrl == null)) {
        res.status(400).json({ error: 'Rien à publier' })
      } else {
        let meme = {
          title: title,
          imageUrl: imageUrl,
          owner: owner,
          UserId: UserId
        }
        await Meme.create(meme)
        res.send(meme)
      }
      // res.send(meme)
    } catch (err) {
      res.status(400).send({
        error: 'Error creating Meme'
      })
    }
  },
  //Modification d'un meme
  async put(req, res) {
    try {
      let imageUrl
      let title = req.body.title
      if (req.file != undefined) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        const meme = await Meme.findByPk(req.params.memeId)
        const filename = meme.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`,()=>{console.log('suppr+modif')})
      }
      else {
        imageUrl == null
      }
      if ((title == 'null' && imageUrl == null)) {
        res.status(400).json({ error: 'Rien à publier' })
      } else {
        let meme = {
          title: title,
          imageUrl: imageUrl
        }
      await Meme.update(meme, {
        where: {
          id: req.params.memeId
        }
      })
      res.send(req.body)
      }
    } catch (err) {
      res.status(400).send({
        error: 'Error editing Meme'
      })
    }
  },
  async delete(req, res) {
    try {
      const {memeId} = req.params
      const meme = await Meme.findByPk(memeId)
      const filename = meme.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`,()=>{})
      await meme.destroy()
      res.send(meme)
    } catch (err) {
      res.status(400).send({
        error: 'Error deleting Meme'
      })
    }
  }
}