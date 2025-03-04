import mongoose, { Schema, model, models, Types } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false,
    },
    role: {
        type: String,
        enum: ['startup', 'sme', 'enterprise'],
        default: 'startup', // You can set a default role
    },
});

const User = models.User || model('User', UserSchema);

export default User;