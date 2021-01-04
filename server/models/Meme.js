
module.exports = (sequelize, Datatypes) => {
    const Meme = sequelize.define('Meme', {
        title : Datatypes.STRING,
        imageUrl : Datatypes.STRING
    })

    return Meme
    }