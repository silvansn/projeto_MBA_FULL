// models/userModel.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async createUser(nome, email, senha) {
        return await prisma.user.create({
            data: {
                nome,
                email,
                senha,
            },
        });
    },

    async getUserById(id) {
        return await prisma.user.findUnique({
            where: {
                id,
            },
        });
    },

    async updateUser(id, data) {
        return await prisma.user.update({
            where: {
                id,
            },
            data,
        });
    },

    async deleteUser(id) {
        return await prisma.user.delete({
            where: {
                id,
            },
        });
    },

    async getAllUsers() {
        return await prisma.user.findMany();
    },
};
