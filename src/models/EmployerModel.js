const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employerSchema = new Schema({
    roleId:{
        type: Schema.Types.ObjectId,
        ref: "roles",
    },
    fullName:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    // websiteURL:{
    //     type: String,
    // },
    // description:{
    //     type: String,
    //     required: true,
    // },
},{
    timestamps: true
})
const bcrypt = require("bcrypt");

employerSchema.pre("save", async function (next) {
  // Only hash the password if it's new or changed
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
module.exports = mongoose.model('Employer', employerSchema);