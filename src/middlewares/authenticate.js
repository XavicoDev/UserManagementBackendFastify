import jwt from 'jsonwebtoken';

export const authenticateJWT = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, 'supersecret'); // Verificar el token utilizando la clave secreta
        req.user = decoded; // Almacenar la información del usuario decodificado en el objeto de solicitud
        next(); // Continuar con el siguiente middleware o controlador
    } catch (error) {
        return res.status(403).json({ message: 'Token de autenticación inválido' });
    }
};

export const authenticateAdminJWT = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, 'supersecret');
        if (decoded.role !== 'administrador') {
            return res.status(403).json({ message: 'Acceso no autorizado: Se requiere el rol de administrador' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token de autenticación inválido' });
    }
};
