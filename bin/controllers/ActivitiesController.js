const mongoose = require('mongoose');
const activities = require('../models/Activities');

const Activities = mongoose.model('Activities');

module.exports = {

    async create(req, res){
        const activity = await Activities.create(req.body);

        return res.json(activity);
    },

    async update(req, res){
        const activity = await Activities.findOneAndUpdate(req.params.id, req.body, { new: true });

        return res.json(activity);
    },

    async index(req, res){
        const {page = 0} = req.query;
        const {limit = 10} = req.query;

        if(page === 0){
            const activities = await Activities.find();
            return res.json(activities);
        } else {
            const activities = await Activities.paginate({}, {page, limit} );
            return res.json(activities);
        }
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
