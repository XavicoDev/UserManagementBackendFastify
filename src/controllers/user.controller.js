import { UserModel } from "../models/user.model.js";

export const getAllUsers = async (request, reply) => {
    try {
        const user = await UserModel.find();
        reply.status(200).send(user);
    } catch (error) {
        reply.status(500).send({ message: error.message });
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
            reply.status(404).send(`User with id:${id} not found`);
        }
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
}

export const createUser = async (request, reply) => {
    try {
        const contractor = await UserModel.create(request.body);
        reply.status(201).send(contractor);
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
