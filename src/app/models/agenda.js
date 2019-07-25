const mongoose = require('../../database');

const AgendaSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    inicio: {
        type: Date,
        required: false,
        lowercase: true
    },
    fim: {
        type: Date,
        required: false,
        select: true
    },
    servico: {
        type: String,
        required: false,
        select: false
    },
    tempoAtendimento: {
        type: String,
        required: false,
        select: false
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
    }
});


const Agenda = mongoose.model('Agenda', AgendaSchema);

module.exports = Agenda;