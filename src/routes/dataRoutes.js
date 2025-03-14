const express = require('express');
const router = express.Router();

const { getbyRange, getLatestData } = require('../controllers/genericDataController');
const { validateDateRange } = require('../middleware/dateValidation');

router.post('/data', express.json(), validateDateRange, getbyRange);
router.get('/data', express.json(), getLatestData);

module.exports = router;