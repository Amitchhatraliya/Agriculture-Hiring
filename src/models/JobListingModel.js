const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobListingSchema = new Schema({
    jobId:{
        type: Schema.Types.ObjectId,
        ref: "Job",
    },
    employerId:{
        type: Schema.Types.ObjectId,
        ref: "Employer",
    },
    jobTitle:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    wage:{
        type: Number,
        required: true,
    },
    startDate:{
        type: String,
        required: true,
    },
    endDate:{
        type: String,
        required: true,
    },
    postedAt:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
},{
    timestamps: true
})
module.exports = mongoose.model('JobListing', jobListingSchema);