const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const EstabelecimentoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false
    },
    nome: {
        type: String,
        required: false,
        lowercase: true
    },
    endereco: {
        type: String,
        required: false,
        select: true
    },
    lat: {
        type: String,
        required: false,
        select: false
    },
    lng: {
        type: String,
        required: false,
        select: false
    },
    celular: {
        type: String,
        required: false,
        select: true
    },
    regiao: {
        type: String,
        required: false,
        select: true
    },
    telefone: {
        type: String,
        required: false,
        select: true
    },
    ifood: {
        type: String,
        required: false,
        select: true
    },
    horarios: {
        type: String,
        required: false,
        select: true
    },
    servico: {
        type: String,
        required: false,
        select: true
    },
    raioDeEntrega: {
        type: Number,
        required: false,
        select: true
    }
});


const Estabelecimento = mongoose.model('Estabelecimento', EstabelecimentoSchema);

module.exports = Estabelecimento;