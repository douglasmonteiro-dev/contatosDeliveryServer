const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const PacienteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    accountType: {
        type: Number,
        required: true,
        select: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function(next) {

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;