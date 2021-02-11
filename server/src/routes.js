const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const MemeController = require('./controllers/MemeController')
const CommentController = require('./controllers/CommentController')
const multer = require('./middleware/multer-config')

const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  app.post('/register',
  AuthenticationControllerPolicy.register,
  AuthenticationController.register)
  app.post('/login',
  AuthenticationControllerPolicy.login,
  AuthenticationController.login)
  app.get('/history/:userId',
  AuthenticationController.index)
  app.get('/user/:userId',
  AuthenticationController.pseudo)
  app.delete('/user/:userId',
  isAuthenticated,
  AuthenticationController.delete)

  app.get('/meme',
  MemeController.index)
  app.get('/meme/:memeId',
  MemeController.show)
  app.put('/meme/:memeId',
  isAuthenticated,
  multer,
  MemeController.put)
  app.post('/meme',
  isAuthenticated,
  multer,
  MemeController.post)
  app.delete('/meme/:memeId',
  isAuthenticated,
  MemeController.delete)

  app.post('/comments',
  isAuthenticated,
  CommentController.post)
  app.delete('/comments/:commentId',
  isAuthenticated,
  CommentController.delete)
  app.get('/comments/:memeId',
  CommentController.index)
}