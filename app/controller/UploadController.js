const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
const Model = require('../../model')
const apiResponse = require('../../helper/apiResponse')
const calculatateAge = require('../../helper/calculateAge')



module.exports = {

    edit: async (req, res) => {
        try {
            const updateModel = await Model.findByIdAndUpdate(req.params.id, {
                ...req.body
            }, {
                new: true
            })
            return apiResponse.successResponse(res, updateModel)
        } catch (error) {
            return apiResponse.serverErrorResponse(res, error)
        }
    },

    view: async (req, res) => {
        try {
            const queryAll = await Model.find()
            return apiResponse.successResponse(res, queryAll)
        } catch (error) {
            return apiResponse.serverErrorResponse(res, error)
        }
    },




    upload: async (req, res) => {
        try {
            const { body } = req;
            const NewModel = new Model();
            const { image } = req.files
            // const allowType = ['image/jpeg', 'image/png']
            // if (allowType.find(type => type == image.mimetype)) throw 'File not supported'

            const naming = require('crypto').randomBytes(8).toString('hex') + '.jpg'
            const pathDirectory = path.join(path.dirname(require.main.filename), '/public') + naming
            const foto500 = await sharp(image.data).resize(500, 500).toFile(pathDirectory)

            const naming1000 = require('crypto').randomBytes(8).toString('hex') + '.jpg'
            const pathDirectory1000 = path.join(path.dirname(require.main.filename), '/public') + naming1000
            const foto1000 = await sharp(image.data).resize(1000, 1000).toFile(pathDirectory1000)


            const tanggalLahir = new Date(body.TanggalLahir);
            NewModel.TanggalLahir = tanggalLahir
            NewModel.url = body.url;
            NewModel.name = body.name;
            NewModel.usia = calculatateAge(tanggalLahir);
            NewModel.mobile = body.mobile;
            NewModel.AsalKota = body.AsalKota;
            NewModel.education = body.education;
            NewModel.Foto500 = pathDirectory;
            NewModel.Foto1000 = pathDirectory1000;

            await NewModel.save()
            return apiResponse.createdResponse(res, 'success')



        } catch (error) {

            return res.status(500).json({
                status: false,
                message: error
            })

        }
    }
}