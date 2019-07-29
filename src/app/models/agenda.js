const mongoose = require('../../database');

const AgendaSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    servicoId: {
        type: String,
        required: true
    },
    inicio: {
        type: Date,
        required: true,
        select: true
    },
    fim: {
        type: Date,
        required: true,
        select: true,
    },
    horaInicio: {
        type: String,
        required: false,
        lowercase: true
    },
    horaFim: {
        type: String,
        required: false,
        select: true
    },
    tempoAtendimento: {
        type: Number,
        required: false,
        select: true
    },
    endereco: {
        type: String,
        required: false,
        select: true
    },
    valor: {
        type: String,
        required: false,
        select: true
    },
    formaPagamento: {
        dinheiro: Boolean,
        pagSeguro: Boolean
    },
    agendamentos: {
        type: Array,
        select: true
    }
});


const Agenda = mongoose.model('Agenda', AgendaSchema);

module.exports = Agenda;