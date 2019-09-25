const mongoose = require('mongoose');
const usersModel = require('../models/Users');
const User = mongoose.model('Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const activities = require('../models/Activities');

const Activities = mongoose.model('Activities');

const authConfig = require('../config/auth');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 7200
    });
}

module.exports = {

    async create(req, res){

        const {email} = req.body;
        try {
            if (await User.findOne({email})) {
                return res.status(400).send({ error: 'Email Já Cadastrado'});
            } else {
                var user = await User.create(req.body);

                return res.json(user);
            }
        }catch (error) {
            return res.status(400).send({error: 'Erro Ao Criar Usuario'})
        }
    },

    async update(req, res){
        const user = await User.findOneAndUpdate(req.params.id, req.body, { new: true });

        return res.json(user);
    },

    async index(req, res){
        const {page = 0} = req.query;
        const {limit = 10} = req.query;

        if(page === 0){
            var users = await User.find();
            return res.json(users);
        } else {
            var accounts = await User.paginate({}, {page, limit} );
            return res.json(accounts);
        }
    },

    async show(req, res){
        const user = await User.findById(req.params.id);
        return res.json(user);

    },

    async showActivities(req, res){
        let user = await users.findById(req.params.id);

        let activities = [];
        for(let i=0, len = user.activities.length; i<len; ++i){
            let activity = await Activities.findById(user.activities[i]);
            activities.push(activity);
        }
        return res.json(activities);

    },

    async delete(req, res){
        await User.findByIdAndRemove(req.params.id);

        return res.send();
    },

    async login(req, res){

        const {email, password} = req.body;
        try {

            const user = await User.findOne({email}).select(+password);

            if (!user) {
                return res.status(400).send({error: 'Email Not Found'});
            }

            if(!await bcrypt.compare(password, user.password)){
                return res.status(400).send({error: 'Invalid Password'});
            }

            user.password = undefined;

            res.send({user, token: generateToken({id: user.id, privileges: user.privileges })});

        }catch (error) {
            return res.status(400).send({error: 'Login Error'})
        }
    },

};
