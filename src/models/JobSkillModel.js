const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSkillSchema = new Schema({

    
    jobId:{
        type:Schema.Types.ObjectId,
        ref:"Job",
    },
    skillId:{
        type:Schema.Types.ObjectId,
        ref:"Skill",
    },
})
module.exports = mongoose.model('JobSkill', jobSkillSchema);