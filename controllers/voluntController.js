// controllers/voluntController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async createVoluntario(req, res){
        const { nome, celular, email, experiencia, conselho, especialidade, disponibilidade } = req.body;
        try {
            const newVoluntario = await prisma.voluntario.create({
                data: {
                    nome,
                    celular,
                    email,
                    experiencia,
                    conselho,
                    especialidade,
                    disponibilidade,
                },
            });
            res.status(201).json(newVoluntario);
        } catch (error) {
            console.error('Erro ao criar voluntário', error);
            res.status(500).json({ error: 'Erro ao criar voluntário' })
        }
    },

    async getVoluntarioById(req, res) {
        const voluntarioId = parseInt(req.params.id);
        try {
            const voluntario = await prisma.voluntario.findUnique({
                where: {
                    id: voluntarioId,
                },
            });
            if (!voluntario) {
                return res.status(404).json({ error: 'Voluntário não encontrado' });
            }
            res.json(voluntario);
        } catch (error) {
            console.error('Erro ao buscar o voluntário:', error);
            res.status(500).json({ error: 'Erro ao buscar o voluntário' });
        }
    },

    async updateVoluntario(req, res) {
        const voluntarioId = parseInt(req.params.id);
        const voluntarioData = req.body;
        try {
            const updatedVoluntario = await prisma.voluntario.update({
                where: {
                    id: voluntarioId,
                },
                data: voluntarioData,
            });
            res.json(updatedVoluntario);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
    },

    async deleteVoluntario(req, res) {
        const voluntarioId = parseInt(req.params.id); 
        try {
            await prisma.voluntario.delete({
                where: {
                    id: voluntarioId,
                },
            });
            res.sendStatus(204);
        } catch (error) {
            console.error('Erro ao excluir voluntário:', error); 
            res.status(500).json({ error: 'Erro ao excluir voluntário' });
        }
    },

    async getAllVoluntarios(req, res) {
        try {
            const voluntarios = await prisma.voluntario.findMany(); 
            res.json(voluntarios);
        } catch (error) {
            console.error('Erro ao buscar voluntários:', error); 
            res.status(500).json({ error: 'Erro ao buscar voluntários' });
        }
    },
};