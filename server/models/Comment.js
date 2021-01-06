
module.exports = (sequelize, Datatypes) => {
    const Comment = sequelize.define('Comment', {})

    Comment.associate = function (models) {
      Comment.belongsTo(models.User)
      Comment.belongsTo(models.Meme)
    }

    return Comment
    }