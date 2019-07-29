const mongoose = require('../../database');

const ServicoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        select: true
    },
    descricao: {
        type: String,
        required: true
    },
    instrucao: {
        type: String,
        required: false,
        select: true
    },
    tempoAtendimento: {
        type: String,
        required: false
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


const Servico = mongoose.model('Servico', ServicoSchema);

module.exports = Servico;