const mongoose = require('../../database');

const AgendamentoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    agendaId: {
        type: String,
        required: true
    },
    servicoId: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: false,
        lowercase: true
    },
    hora: {
        type: Number,
        required: false,
        select: true
    },
    minutos: {
        type: Number,
        required: false,
        select: true
    },
    servico: {
        type: String,
        required: false,
        select: true
    },
    nome: {
        type: String,
        required: false,
        select: true
    },
    profissional: {
        type: String,
        required: false,
        select: true
    },
    tempoAtendimento: {
        type: Number,
        required: false,
        select: true
    },
    pagamento: {
        type: Boolean,
        required: false,
        select: false
    },
    confirmado: {
        type: Boolean,
        required: false,
        select: true
    }
});


const Agendamento = mongoose.model('Agendamento', AgendamentoSchema);

module.exports = Agendamento;