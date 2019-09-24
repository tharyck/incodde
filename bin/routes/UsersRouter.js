const express = require('express');
const router = express.Router();
const controller = require('../controllers/UsersController');
const auth = require('../middlewares/auth');

// router.use(auth);
router.get('/',  controller.index);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.get('/:id', controller.show);
router.delete('/:id', controller.delete);
module.exports = router;
