
module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define('User', {
        email : {
            type : Datatypes.STRING,
            unique: true
        },
        password: Datatypes.STRING,
        name: Datatypes.STRING,
        firstName: Datatypes.STRING,
        admin: {
          type: Datatypes.BOOLEAN,
          defaultValue: false
        }
    })
    User.associate = function (models) {
      User.hasMany(models.Comment)
      User.hasMany(models.Meme)
    }
    return User
    }