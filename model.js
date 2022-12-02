const mongoose = require('mongoose');

const CreateSchema = mongoose.Schema(
    {
        url: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        TanggalLahir: {
            type: Date,
            required: true
        },
        usia: {
            type: Number,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        AsalKota: {
            type: String,
            required: true
        },
        education: {
            type: String,
            required: true
        },
        Foto500: {
            type: String,
            required: true
        },
        Foto1000: {
            type: String,
            required: true
        }
    }, {
    timestamps: true
}
)

module.exports = mongoose.model('Create', CreateSchema)