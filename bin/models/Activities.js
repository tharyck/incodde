const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ActivitiesSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },

    description: {
        type: String,
        require: true,
    },

    status: {
        type: String,
        require: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },

    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

ActivitiesSchema.plugin(mongoosePaginate);
mongoose.model('Activities', ActivitiesSchema );
