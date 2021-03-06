const path =  require('path')

module.exports = {
    port : process.env.PORT || 8081,
    db : {
        database : process.env.DB_NAME || 'Groupomania',
        user: process.env.DB_USER || 'Groupomania',
        password: process.env.DB_PASS || 'Groupomania',
        options:{
            dialect : process.env.DIALECT || 'sqlite',
            host : process.env.HOST || 'localhost',
            storage: path.resolve(__dirname, '../../Groupomania.sqlite')
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}