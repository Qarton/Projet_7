const Joi = require('joi')

module.exports =  {
    register (req, res, next) {
        const schema = Joi.object({
            email : Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{3,16}$')
            )
        })

        const{error, value} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error : 'Invalid email'
                    })
                    break
                case 'password' :
                    res.status(400).send({
                        error : 'Invalid password'
                    })
                    break
                default :
                    res.status(400).send({
                        error : 'default'
                    })
            }
        } else {
            next()
        }
    }
}