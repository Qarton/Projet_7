const { Comment,Meme,User } = require('../models')

module.exports = {
  async search (req, res) {
    try {
      let comments = null
      let memes = null
      let owner = null
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
      let user = await User.findOne({
        where: {
          id : userId
        }
      })
      owner = user.name + ' ' + user.firstName
      let answer = {
        owner: owner,
        comments: comments,
        memes: memes
      }
      res.send(answer)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the image and comments ?'
      })
    }
  }
}