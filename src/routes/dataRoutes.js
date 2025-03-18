const express = require('express');
const router = express.Router();

const { getbyDate, getLatest } = require('../controllers/valesController');
const { validateDateRange } = require('../middleware/dateValidation');
const { validate } = require('../middleware/authValidation')

router.post('/data', express.json(), validate, validateDateRange, getbyDate);
router.get('/data', validate, getLatest);

module.exports = router;