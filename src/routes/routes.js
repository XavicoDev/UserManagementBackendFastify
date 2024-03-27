import { authenticateJWT, authenticateAdminJWT } from '../middlewares/authenticate.js';
import { login, getAllUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const prefixUser = 'user';

const routes = async (fastify, options) => {
    //testing create user initial
    fastify.post(`/${prefixUser}/freeCreate`, createUser)
    // general
    fastify.post(`/login`, login)
    // user.controller.js
    fastify.get(`/${prefixUser}`, { preHandler: authenticateJWT }, getAllUsers)
    fastify.get(`/${prefixUser}/:id`, { preHandler: authenticateJWT }, getUser)
    fastify.post(`/${prefixUser}`, { preHandler: authenticateAdminJWT }, createUser)
    fastify.put(`/${prefixUser}/:id`, { preHandler: authenticateAdminJWT }, updateUser)
    fastify.delete(`/${prefixUser}/:id`, { preHandler: authenticateAdminJWT }, deleteUser)
}

export default routes