const DataModel = require('../models/genericDataModel');
const Database = require('../config/dbConfig');

// Create database instance and model with dependency injection
const db = Database.getInstance();
const dataModelInstance = new DataModel(db);


const getbyRange = async (req, res) => {
    const { startDate, endDate } = req.validatedDates;
    
    try {
        const result = await dataModelInstance.getbyRange({ startDate, endDate });
        return res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (error) {
        throw {
            status: 'error',
            message: 'Failed to fetch data by range',
            error: error.message
        };
    }
};

const getLatestData = async (req, res) => {
    try {
        const result = await dataModelInstance.getLatest();
        return res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (error) {
        throw {
            status: 'error',
            message: 'Failed to fetch latest data',
            error: error.message
        };
    }
};

module.exports = {
    getbyRange,
    getLatestData
};