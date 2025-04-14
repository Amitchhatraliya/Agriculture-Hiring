const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
    roleId:{
        type: Schema.Types.ObjectId,
        ref: "roles",
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    fullName:{
        type: String,
        required: true,
    },
    // skill:{
    //     type: String,
    //     required: true,
    // },
    // experience:{
    //     type: String,
    //     required: true,
    // },
    availability:{
        type: String,
        required: true,
    },
    // certification:{
    //     type: String,
    //     required: true,
    // },
    location:{
        type: String,
        required: true,
    },
    // references:{
    //     type: String,
    //     required: true,
    // },
},{
    timestamps: true
})
const bcrypt = require("bcrypt");

workerSchema.pre("save", async function (next) {
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

module.exports = mongoose.model('Worker', workerSchema);