const mongoose = require('mongoose');
const activities = require('../models/Activities');

const Activities = mongoose.model('Activities');

module.exports = {

    async create(req, res){
        const activity = await Activities.create({title: req.body.title, description: req.body.description, status: req.body.status, user: req.userId});
        return res.json(activity);
    },

    async update(req, res){
        const activity = await Activities.findOneAndUpdate(req.params.id, {title: req.body.title, description: req.body.description, status: req.body.status, user: req.userId}, { new: true });
        return res.json(activity);
    },

    async index(req, res){
        const activities = await Activities.find({user: req.userId});
        return res.json(activities);
    },

    async show(req, res){
        const activity = await Activities.findById(req.params.id);
        return res.json(activity);

    },

    async delete(req, res){
        await Activities.findByIdAndRemove(req.params.id);

        return res.send();
    },
};
