const express = require('express');
const router = express.Router();
const controller = require('../controllers/writeDiaryController');

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.delete('/:id', controller.delete);

module.exports = router;
