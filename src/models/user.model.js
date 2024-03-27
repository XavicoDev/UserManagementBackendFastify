
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['administrador', 'usuario estándar', 'invitado'],
        default: 'usuario estándar'
    },
    password: {
        type: String,
        required: true
    }
});

export const UserModel = mongoose.model('user', userSchema, 'user')