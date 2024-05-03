// routes/index.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController');
const VoluntController = require('../controllers/voluntController'); // Importe o controlador correto

// Rotas para usuários
router.post('/users', UserController.createUser);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
router.get('/users', UserController.getAllUsers);

// Rota para login
router.post('/login', AuthController.login);

// Rotas para voluntários
router.post('/voluntarios', VoluntController.createVoluntario); // Use o método correto do controlador de voluntários
router.get('/voluntarios/:id', VoluntController.getVoluntarioById);
router.put('/voluntarios/:id', VoluntController.updateVoluntario);
router.delete('/voluntarios/:id', VoluntController.deleteVoluntario);
router.get('/voluntarios', VoluntController.getAllVoluntarios);

module.exports = router;
