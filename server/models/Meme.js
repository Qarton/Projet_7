
module.exports = (sequelize, Datatypes) => {
    const Meme = sequelize.define('Meme', {
        title : Datatypes.STRING,
        imageUrl : Datatypes.STRING,
        owner : Datatypes.STRING
    })
    Meme.associate = function (models) {
      Meme.belongsTo(models.User, { onDelete: 'CASCADE' })
      Meme.hasMany(models.Comment)
    }

    return Meme
    }