let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: { type: String, unique: false, required: true },
    email: { type: String,unique: true, required: true },
    password: { type: String, required: true, confirmed: { type: Boolean, defaultValue: false } },
    isAdmin: { type: Boolean, required: true, defaultValue: false },
});

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);