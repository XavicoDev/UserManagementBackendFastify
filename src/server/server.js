import Fastify from 'fastify'
import { connectDB } from '../database/db.js';
import routes from '../routes/routes.js';
import cors from '@fastify/cors'

const fastify = Fastify({
    logger: false
})

fastify.register(cors, {
    origin: true, // Habilitar CORS para todas las rutas
    methods: ['GET', 'POST', 'PUT', 'DELETE'] // Métodos permitidos
});

fastify.register(routes, { prefix: '/apiFastify/v1/' })

const port = 3000;
const uri = 'mongodb://localhost:27017/user_management';

const startServer = () => {
    try {
        connectDB(uri);
        fastify.listen({ port: port, host: '0.0.0.0' }, (error) => {
            if (error) {
                console.error(error);
            }
            else {
                console.log(`Server running in local http://localhost:${port}/apiFastify/v1`);
            }
        })
    } catch (err) {
        fastify.log.error(err)
    }
}

startServer();

