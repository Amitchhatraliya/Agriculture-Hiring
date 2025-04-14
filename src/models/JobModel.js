const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    companyName:{
        type: String,
        required: true,
        unique: true,
    },
    title:{
        type: String,
        required: true,
        // unique: true,
    },
    // postedby:{
    //     type: String,
    //     required: true,
    // },
    employementType: {
        type: String,
        enum: ['Seasonal', 'Contract', 'Part-Time', 'Full-Time'],
        default:"Full-Time",
        required: true
    },
    
    // employementType:{
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    salaryRange:{
        type: String,
        required: true,
        // unique: true,
    },
    jobDescription:{
        type: String,
        required: true,
        // unique: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Draft'],
        default: 'Active'
    },
    
    location:{
        type: String,
        // unique: true,
    },
    stateId:{
        type: Schema.Types.ObjectId,
        ref: "State",
    },
    // companyId:{
    //     type: Schema.Types.ObjectId,
    //     ref: "Company",
    // },
    cityId:{
        type: Schema.Types.ObjectId,
        ref: "City",
    },
},{
    timestamps: true
})
module.exports = mongoose.model('Job', jobSchema);