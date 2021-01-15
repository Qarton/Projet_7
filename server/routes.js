const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const MemeController = require('./controllers/MemeController')
const CommentController = require('./controllers/CommentController')

const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
    app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
    app.post('/login',
    AuthenticationController.login)
    app.get('/user',
    AuthenticationController.index)
    app.delete('/user/:userId',
    AuthenticationController.delete)

    app.get('/meme',
    MemeController.index)
    app.get('/meme/:memeId',
    MemeController.show)
    app.put('/meme/:memeId',
    MemeController.put)
    app.post('/meme',
    isAuthenticated,
    MemeController.post)

    app.post('/comments',
    isAuthenticated,
    CommentController.post)
    app.delete('/comments/:commentId',
    isAuthenticated,
    CommentController.delete)
}