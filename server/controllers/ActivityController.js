const { Comment,Meme } = require('../models')

module.exports = {
  async search (req, res) {
    try {
      let comments = null
      let memes = null
      const userId = req.query.userId
      comments = await Comment.findAll({
          where: {
            UserId : userId
          }
        })
      memes = await Meme.findAll({
        where: {
          UserId : userId
        }
      })
      let answer = {
        comments: comments,
        memes: memes
      }
      console.log(answer)
      res.send(answer)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the image and comments ?'
      })
    }
  }
}