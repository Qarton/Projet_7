const { Comment,Meme } = require('../models')

module.exports = {
  //Ajout d'un commentaire
  async post(req, res) {
    try {
      const {memeId, userId, text, owner} = req.body
      const comment = await Comment.findOne({
        where: {
          MemeId: memeId,
          UserId: userId
        }
      })
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