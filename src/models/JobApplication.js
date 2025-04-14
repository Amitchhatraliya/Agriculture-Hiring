const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
    // jobId:{
    //     type: Schema.Types.ObjectId,
    //     ref: "Job",
    // },
    // userId:{
    //     type: Schema.Types.ObjectId,
    //     ref: "users",
    // },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    resume:{
        type: String,
        required: true,
    },
    coverletter:{
        type: String,
        required: true,
    },
    // status:{
    //     type: String,
    //     required: true,
    // },
},{
    timestamps: true
})
module.exports = mongoose.model('JobApplication', jobApplicationSchema);