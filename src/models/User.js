"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
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
var User = mongoose_1.models.User || (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
