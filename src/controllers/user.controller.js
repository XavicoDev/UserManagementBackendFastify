import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


export const getAllUsers = async (request, reply) => {
    try {
        const user = await UserModel.find();
        reply.status(200).send(user);
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
}

export const login = async (request, reply) => {
    const { email, password } = request.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return reply.status(401).send({ message: 'Correo electrónico o contraseña incorrectos' });
        }
        const isPasswordValid = await user.authenticate(password);
        if (!isPasswordValid) {
            return reply.status(401).send({ message: 'Correo electrónico o contraseña incorrectos' });
        }
        // Generar un token JWT
        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, 'supersecret', { expiresIn: '1h' });
        return reply.send({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        reply.status(500).send({ message: 'Error interno del servidor' });
    }
}

export const getUser = async (request, reply) => {
    try {
        const { id } = request.params;
        const user = await UserModel.findById(id);
        if (user) {
            reply.status(200).send(user);
        }
        else {
            reply.status(404).send({ message: `User with id:${id} not found }`});
        }
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
}

export const createUser = async (request, reply) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = {
            ...request.body,
            password: hashedPassword
        };
        const newUser = await UserModel.create(user);
        reply.status(201).send(newUser);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(error => error.message);
            reply.status(400).send({ message: 'Validation error', errors });
        }
        else {
            reply.status(500).send({ message: error.message });
        }
    }
}

export const updateUser = async (request, reply) => {
    try {
        const { id } = request.params;
        const user = await UserModel.findByIdAndUpdate(
            id,
            request.body,
            { new: true, runValidators: true }
        );
        if (user) {
            reply.status(200).send(user);
        }
        else {
            reply.status(404).send(`User with id:${id} not found`);
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(error => error.message);
            reply.status(400).send({ message: 'Validation error', errors });
        }
        else {
            reply.status(500).send({ message: error.message });
        }
    }
}

export const deleteUser = async (request, reply) => {
    try {
        const { id } = request.params;
        const user = await UserModel.findByIdAndDelete(id);
        if (user) {
            reply.status(200).send(`User with id:${id} removed`);
        }
        else {
            reply.status(404).send(`User with id:${id} not found`);
        }
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
}
