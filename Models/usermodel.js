const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema (
   {
       name: {
           type: String,
           required: true,
       },
       email: {
           type: String,
           required: true,
           unique: true,
       },
       password: {
           type: String,
           required: true,
       },
       isAdmin: {
           type: Boolean,
           required: true,
           default: false,
       },
       pic: {
           type: String,
           required: true,
           default: "https://icon-library.com/images/person-head-icon/person-head-icon-27.jpg"
       },
   },
   {
       timeStamps: true,
   }
);
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
 });

 userSchema.methods.matchPassword=async function (enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password)
 }

const User = mongoose.model('user', userSchema);

module.exports = User;