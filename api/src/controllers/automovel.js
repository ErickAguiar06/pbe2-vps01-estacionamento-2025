const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const automovel = await prisma.automovel.create({
            data: req.body
        });
        res.status(201).json(automovel).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};

const read = async (req, res) => {
    try {
        const automoveis = await prisma.automovel.findMany();
        res.status(200).json(automoveis).end();
    } catch (e) {
        res.status(500).json({ error: e.message }).end();
    }
};

const readOne = async (req, res) => {
    try {
        const automovel = await prisma.automovel.findUnique({
            where: {
                placa: req.params.placa
            },
            include: {
                estadias: true
            }
        });

        if (!automovel) {
            return res.status(404).json({ error: "Automóvel não encontrado" }).end();
        }

        res.status(200).json(automovel).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};

const update = async (req, res) => {
    try {
        const automovel = await prisma.automovel.update({
            data: req.body,
            where: {
                placa: req.params.placa
            }
        });
        res.status(202).json(automovel).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};

const remove = async (req, res) => {
    try {
        const automovel = await prisma.automovel.delete({
            where: {
                placa: req.params.placa
            }
        });
        res.status(204).json(automovel).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};

module.exports = {
    create,
    read,
    readOne,
    update,
    remove
};
