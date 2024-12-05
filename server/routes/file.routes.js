const Router = require('express');
const router = new Router();
const authMiddleware = require('../middlewares/auth.middleware')
const fileController = require('../controllers/file.controller')


router.post('/', authMiddleware, fileController.createDir)
router.get('/', authMiddleware, fileController.getUserFiles)
router.post('/upload', authMiddleware, fileController.uploadFile)

module.exports = router;
