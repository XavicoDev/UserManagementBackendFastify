import { authenticateJWT } from '../middlewares/authenticate.js';
import { login, getAllUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const prefixUser = 'user';

const routes = async (fastify, options) => {
    // general
    fastify.post(`/login`, login)
    // user.controller.js
    fastify.get(`/${prefixUser}`, getAllUsers)
    fastify.get(`/${prefixUser}/:id`, getUser)
    fastify.post(`/${prefixUser}`,  createUser)
    fastify.put(`/${prefixUser}/:id`, updateUser)
    fastify.delete(`/${prefixUser}/:id`, deleteUser)
}

export default routes