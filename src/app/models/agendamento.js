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
    pagamento: {
        type: Boolean,
        required: false,
        select: false
    }
});


const Agendamento = mongoose.model('Agendamento', AgendamentoSchema);

module.exports = Agendamento;