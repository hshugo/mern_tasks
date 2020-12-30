const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId, // Like to Inner Join
        ref: 'User' //Relationship with the other model
    },
    created:{
        type: Date,
        default: Date.now()
    }
})

module.exports= mongoose.model('Project', ProjectSchema);