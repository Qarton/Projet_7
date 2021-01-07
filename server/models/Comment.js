
module.exports = (sequelize, Datatypes) => {
    const Comment = sequelize.define('Comment', {
      text: Datatypes.STRING
    })

    Comment.associate = function (models) {
      Comment.belongsTo(models.User)
      Comment.belongsTo(models.Meme)
    }

    return Comment
    }