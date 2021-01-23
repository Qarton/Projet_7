const { Comment,Meme } = require('../models')

module.exports = {
  //Ajout d'un commentaire
  async post(req, res) {
    try {
      const {memeId, userId, text} = req.body
      const newComment = await Comment.create({
        MemeId: memeId,
        UserId: userId,
        text: text,
        owner: req.user.firstName + ' ' + req.user.name
      })
      res.send(newComment)
    } catch (err) {
      res.status(400).send({
        error: 'Error creating comment'
      })
    }
  },
  //Suppression d'un commentaire
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