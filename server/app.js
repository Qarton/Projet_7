const express = require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const {sequelize} = require('./models')
const config = require('./config/config')

require('./passport')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())




require('./routes')(app)

sequelize.sync()
//{force: true}
.then(()=> {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
})
