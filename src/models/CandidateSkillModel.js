const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSkillSchema = new Schema({

    
    skillId:{
        type:Schema.Types.ObjectId,
        ref:"Skill",
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users",
    },
})
module.exports = mongoose.model('CandidateSkill', candidateSkillSchema);