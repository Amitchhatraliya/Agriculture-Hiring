const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCompanySchema = new Schema({

    userId:{
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    title:{
        type:String,
        required: true,
    },
    companyId:{
        type: Schema.Types.ObjectId,
        ref: "Company",
    },
})
module.exports = mongoose.model('UserCompany', userCompanySchema);