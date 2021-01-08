const { Comment } = require('../models')

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
      const {memeId, userId, text} = req.body
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
        text: text
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
  }
}