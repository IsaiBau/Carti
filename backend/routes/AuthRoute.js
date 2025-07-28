import express from "express";
import { Login, logOut, Me, googleAuth } from "../controllers/Auth.js";
import { verifyUser } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Ruta para verificar sesión activa
router.get('/me', verifyUser, Me);

// Ruta para login tradicional (RFC + contraseña)
router.post('/login', Login);

// Ruta para autenticación con Google
router.post('/google-auth', googleAuth);

// Ruta para cerrar sesión
router.delete('/logout', verifyUser, logOut);

export default router;