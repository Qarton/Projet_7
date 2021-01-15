const {User,Meme,Comment} = require('../models')
const jwt = require ('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcrypt')

function jwtSignUser (user) {
    const ONE_HOUR = 60 * 60
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn : ONE_HOUR
    })
}

const correctPassword = (enteredPassword, originalPassword) => {
    return new Promise(resolve => {
      bcrypt.compare(enteredPassword, originalPassword, (err, res) =>{
        resolve(res)
      });  
    })
  }

module.exports = {
    // enregistrement d'un utilisateur
    async register (req, res) {
        const hash = bcrypt.hashSync(req.body.password, 10);
        try {
            const user = await User.create(
                Object.assign(req.body, { password: hash })
            )
            const userJson = user.toJSON()
            res.send({
               user : userJson,
               token: jwtSignUser(userJson),
               success: 'Registered!'
            })
        } catch (err) {
            res.status(400).send({
                error: 'This email account is already in use'
            })
        }
    },
    // Login d'un utilisateur
    async login (req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email:email
                }
            })
            if(!user){
                return res.status(403).send({
                    error:'Login information incorrect'
                })
            }
            const authenticated = await correctPassword(password, user.password);
            if (!authenticated) {
                return res.status(403).send({
                    error:'password information incorrect'
                })
              }
            const userJson = user.toJSON()
            res.send({
               user : userJson,
               token: jwtSignUser(userJson),
               success: 'Loged in!',
               authenticated : authenticated
            })
        } catch (err) {
            res.status(500).send({
                error: 'Error occured'
            })
        }
    },
    // Accès à l'historique d'un utilisateur
    async index(req, res) {
      try {
        const userId = req.query.userId
        const userEmail = await User.findOne({
          where: {
            id: userId
          },
          attributes: ['name','firstName'],
          include:  [{model: Comment},{model: Meme}]
        })
        res.send(userEmail)
      } catch (err) {
        res.status(400).send({
          error: 'Error fetch name'
        })
      }
    },
    async delete(req, res) {
      try {
        const {userId} = req.params
        const user = await User.findByPk(userId)
        await user.destroy()
        res.send(user)
      } catch (err) {
        res.status(400).send({
          error: 'Error deleting User'
        })
      }
    }
}