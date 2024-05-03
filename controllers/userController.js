// controllers/userController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async createUser(req, res) {
        const { nome, email, senha } = req.body;
        try {
            const newUser = await prisma.user.create({
                data: {
                    nome,
                    email,
                    senha,
                },
            });
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    },

    async getUserById(req, res) {
        const userId = parseInt(req.params.id);
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.json(user);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    },

    async updateUser(req, res) {
        const userId = parseInt(req.params.id);
        const userData = req.body;
        try {
            const updatedUser = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: userData,
            });
            res.json(updatedUser);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
    },

    async deleteUser(req, res) {
        const userId = parseInt(req.params.id);
        try {
            await prisma.user.delete({
                where: {
                    id: userId,
                },
            });
            res.sendStatus(204);
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            res.status(500).json({ error: 'Erro ao excluir usuário' });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await prisma.user.findMany();
            res.json(users);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    },
};
