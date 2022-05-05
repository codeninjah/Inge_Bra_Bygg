const User = require('../models/User');

class UserController{
    async getOne(req, res, next){
        try{
            const user = await User.findOne({where:{id: req.params.id}})
            if(!user){
                //något felmeddelande
                res.status(404).json()
            }
            res.json(user)
        }catch(error){
            next(error)
        }
    }

    async getAll(req, res, next){
        const users = await User.findAll()
        res.json(users)
    }

    async create(req, res, next){
        const { message, images } = req.body
        const user = await User.create({message, images})
        res.status(201).json(user)
    }

    async update(req, res, next){
        try{
            const user = await User.findOne({where:{id: req.params.id}})
            const { username, password_hash, role } = req.body
            if(!user){
                res.status(404).json()
            }
            user.username = username
            user.password_hash = password_hash
            user.role = user.role
            user.save()
            res.json(user)
        }catch(error){
            next(error)
        }
    }

    async delete(req, res, next){
        const user = await User.destroy({where: {id: req.params.id}})
        res.status(200).json({message: 'user is deleted'})
    }
}

module.exports = UserController