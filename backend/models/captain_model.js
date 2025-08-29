const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: { type: String, required: true, minlength: [3, 'Firstname must be atleast 3 characters long'], },
        lastname: { type: String, minlength: [3, 'Lastname must be atleast 3 characters long'], },
    },
    email: { type: String, required: true, unique: true, lowercase: true, match: [/\S+@\S+\.\S+/, 'Email invalid'], },
    password: { type: String, required: true, minlength: [6, 'Password must be atleast 6 characters long'], },
    socketId: { type: String},
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    vehicle: {
        colour: { type: String, required: true },
        plate: { type: String, required: true, unique: true, minlength: [3, 'Plate must be atleast 3 characters long'], },
        capacity: { type: Number, required: true, min: [1, 'Capacity must be atleast 1'], },
        vehicleType: { type: String, enum: ['bike', 'car', 'auto'], required: true },
    },
    location: {
        lat:{ type: Number, },
        lng:{ type: Number, },
    }
});

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id }, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token;
}

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;