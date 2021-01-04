
module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define('User', {
        email : {
            type : Datatypes.STRING,
            unique: true
        },
        password: Datatypes.STRING
    })

    return User
    }