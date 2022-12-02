const router = require('express').Router()
const app = require('express')()


const UploadController = require('../controller/UploadController')

router.post('/create', UploadController.upload)

router.get('/view', UploadController.view)

router.put('/edit/:id', UploadController.edit)



app.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = router