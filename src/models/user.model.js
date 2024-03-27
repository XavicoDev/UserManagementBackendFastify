
import mongoose from "mongoose"; 
import bcrypt from "bcrypt";

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

userSchema.methods.authenticate = async function(password) {
    return await bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model('user', userSchema, 'user')