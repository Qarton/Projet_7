const Joi = require('joi')

module.exports =  {
    register (req, res, next) {
        const schema = Joi.object({
            email : Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{3,16}$')
            ),
            name: Joi.string().regex(
              new RegExp("^[-'0-9a-zA-ZÀ-ÿ]{3,16}$")
          )
            .min(3)
            .max(30)
            .required(),
            firstName: Joi.string().regex(
              new RegExp("^[-'0-9a-zA-ZÀ-ÿ]{3,16}$")
          )
            .min(3)
            .max(30)
            .required(),
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
                case 'name' :
                    res.status(400).send({
                        error : 'Invalid name'
                    })
                    break
                case 'firstName' :
                    res.status(400).send({
                        error : 'Invalid firstName'
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