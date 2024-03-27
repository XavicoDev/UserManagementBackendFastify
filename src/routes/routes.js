// import fastify from "fastify";
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
 
const prefixUser = 'user'; 

const routes = async (fastify, options) => {
    // user.controller.js
    fastify.get(`/${prefixUser}`, getAllUsers)
    fastify.get(`/${prefixUser}/:id`, getUser)
    fastify.post(`/${prefixUser}`, createUser)
    fastify.put(`/${prefixUser}/:id`, updateUser)
    fastify.delete(`/${prefixUser}/:id`, deleteUser) 
}

export default routes