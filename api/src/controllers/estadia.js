const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    const { placa, valorHora } = req.body;

    try {
        const estadia = await prisma.estadia.create({
            data: {
                placa,
                valorHora
            }
        });
        res.status(201).json(estadia).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};

const read = async (req, res) => {
    try {
        const estadias = await prisma.estadia.findMany();
        res.status(200).json(estadias).end();
    } catch (e) {
        res.status(500).json({ error: e.message }).end();
    }
};

const readOne = async (req, res) => {
    try {
        const estadia = await prisma.estadia.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        if (!estadia) {
            return res.status(404).json({ error: "Estadia não encontrada" }).end();
        }

        res.status(200).json(estadia).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { saida } = req.body;

    try {
        const estadiaAtual = await prisma.estadia.findUnique({
            where: { id: Number(id) }
        });

        if (!estadiaAtual) {
            return res.status(404).json({ error: "Estadia não encontrada" }).end();
        }

        let valorTotal = null;
        if (saida) {
            const entrada = new Date(estadiaAtual.entrada);
            const saidaDate = new Date(saida);
            const duracaoHoras = (saidaDate - entrada) / (1000 * 60 * 60);
            valorTotal = Number((duracaoHoras * estadiaAtual.valorHora).toFixed(2));
        }

        const estadiaAtualizada = await prisma.estadia.update({
            where: { id: Number(id) },
            data: {
                saida: saida ? new Date(saida) : undefined,
                valorTotal
            }
        });

        res.status(202).json(estadiaAtualizada).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};

const remove = async (req, res) => {
    try {
        const estadia = await prisma.estadia.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(204).json(estadia).end();
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
