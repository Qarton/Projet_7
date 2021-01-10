const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const MemeController = require('./controllers/MemeController')
const CommentController = require('./controllers/CommentController')
const ActivityController = require('./controllers/ActivityController')

module.exports = (app) => {
    app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
    app.post('/login',
    AuthenticationController.login)
    app.get('/user',
    AuthenticationController.index)

    app.get('/meme',
    MemeController.index)
    app.get('/meme/:memeId',
    MemeController.show)
    app.post('/meme',
    MemeController.post)


    app.get('/comments',
    CommentController.index)
    app.post('/comments',
    CommentController.post)
    app.delete('/comments/:commentId',
    CommentController.delete)

    app.get('/activity',
    ActivityController.search)
}