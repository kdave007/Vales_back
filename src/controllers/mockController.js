const MockModel  = require('../models/mockModel');

const test = async (req, res) => {
    try {
      const response = await MockModel.findAll();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch mock data',
        error: error.message
      });
    }
  };
  


module.exports = { test };
