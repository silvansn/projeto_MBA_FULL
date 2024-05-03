const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async createVoluntario(nome, celular, email, experiencia, conselho, especialidade, disponibilidade) {
        return await prisma.voluntario.create({
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
    },

    async getVoluntarioById(id) {
        return await prisma.voluntario.findUnique({
            where: {
                id,
            },
        });
    },

    async updateVoluntario(id, data) {
        return await prisma.voluntario.update({
            where: {
                id,
            },
            data,
        });
    },

    async deleteVoluntario(id) {
        return await prisma.voluntario.delete({
            where: {
                id,
            },
        });
    },

    async getAllVoluntarios() {
        return await prisma.voluntario.findMany(); // Corrigido para findMany()
    },
};
