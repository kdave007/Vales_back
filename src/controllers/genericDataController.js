const DataModel = require('../models/genericDataModel');

// Shared instance for all methods
const dataModelInstance = new DataModel();

// Shared utility function
const formatDateRange = (startDate, endDate) => {
    return { 
        startDate: new Date(startDate), 
        endDate: new Date(endDate) 
    };
};



const getbyRange = async (req,res) => {
    const { startDate, endDate } = req.validatedDates;
    
    try {
        //const range = formatDateRange(startDate, endDate);
        
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

const getLatestData = async (req,res) => {
    try {
        // Using the same shared instance
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