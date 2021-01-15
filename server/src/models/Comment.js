
module.exports = (sequelize, Datatypes) => {
    const Comment = sequelize.define('Comment', {
      text: Datatypes.STRING,
      owner: Datatypes.STRING
    })

    Comment.associate = function (models) {
      Comment.belongsTo(models.User, { onDelete: 'CASCADE' })
      Comment.belongsTo(models.Meme)
    }

    return Comment
    }