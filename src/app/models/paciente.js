const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const PacienteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    cpf: {
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
    telefone: {
        type: String,
        required: false,
        select: true
    },
    nomeCartao: {
        type: String,
        required: false,
        select: true
    },
    numeroCartao: {
        type: Number,
        required: false,
        select: true
    },
    cvvCartao: {
        type: Number,
        required: false,
        select: true
    },
    mesCartao: {
        type: Number,
        required: false,
        select: true
    },
    anoCartao: {
        type: Number,
        required: false,
        select: true
    },
    agendamentos: [{
        data: Date,
        servico: String,
        valor: Number,
        pagamento: Boolean
    }]
});


const Paciente = mongoose.model('Paciente', PacienteSchema);

module.exports = Paciente;