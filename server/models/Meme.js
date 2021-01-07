
module.exports = (sequelize, Datatypes) => {
    const Meme = sequelize.define('Meme', {
        title : Datatypes.STRING,
        imageUrl : Datatypes.STRING
    })
    Meme.associate = function (models) {
      Meme.belongsTo(models.User)
    }

    return Meme
    }