const express = require('express');
const router = express.Router();

const { getbyRange, getLatestData } = require('../controllers/genericDataController');
const { validateDateRange } = require('../middleware/dateValidation');
const { validate } = require('../middleware/authValidation')

router.post('/data', express.json(), validate, validateDateRange, getbyRange);
router.get('/data', validate, getLatestData);

module.exports = router;