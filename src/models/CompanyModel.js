const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    industry:{
        type: String,
        required: true,
    },
    stateId:{
        type: Schema.Types.ObjectId,
        ref:"State",
    },
    cityId:{
        type: Schema.Types.ObjectId,
        ref:"City",
    },
    website:{
        type: String,
        required: true,
        unique: true,
    }
},{
    timestamps: true
})
module.exports = mongoose.model('Company', companySchema);