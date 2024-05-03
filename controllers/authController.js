// controllers/authController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async login(req, res) {
        const { email, senha } = req.body;
        try {
            // Verificar se o usuário existe com o email e a senha fornecidos
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });

            if (!user || user.senha !== senha) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            // Se as credenciais estiverem corretas, retornar o usuário
            res.json(user);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).json({ error: 'Erro ao fazer login' });
        }
    },
};
