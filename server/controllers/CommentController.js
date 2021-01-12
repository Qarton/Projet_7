const { Comment,Meme } = require('../models')

module.exports = {
  async index(req, res) {
    try {
      const memeId = req.query.memeId
      const comment = await Comment.findAll({
        where: {
          MemeId: memeId
        }
      })
      res.send(comment)
    } catch (err) {
      res.status(400).send({
        error: 'Error fetch comment'
      })
    }
  },
  async post(req, res) {
    try {
      const {memeId, userId, text, owner} = req.body
      const comment = await Comment.findOne({
        where: {
          MemeId: memeId,
          UserId: userId
        }
      })
      // if (comment) {
      //   return res.status(400).send({
      //     error : 'already commented'
      //   })
      // }
      const newComment = await Comment.create({
        MemeId: memeId,
        UserId: userId,
        text: text,
        owner: owner
      })
      res.send(newComment)
    } catch (err) {
      res.status(400).send({
        error: 'Error creating comment'
      })
    }
  },
  async delete(req, res) {
    try {
      const {commentId} = req.params
      const comment = await Comment.findByPk(commentId)
      await comment.destroy()
      res.send(comment)
    } catch (err) {
      res.status(400).send({
        error: 'Error deleting comment'
      })
    }
  },
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
      res.send(answer)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the image and comments ?'
      })
    }
  }
}