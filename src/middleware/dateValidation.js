const validateDateRange = (req, res, next) => {
    //console.log("req received:", req.body)
    const { startDate, endDate } = req.body;
    
    if (!startDate || !endDate) {
        return res.status(400).json({
            status: 'error',
            message: 'startDate and endDate are required in request body'
        });
    }

    try {
        // Validate date format and convert to Date objects
        let start = new Date(startDate);
        let end = new Date(endDate);

        start = start.toISOString().split('T')[0];
        end = end.toISOString().split('T')[0];
        
        if (start > end) {
            return res.status(400).json({
                status: 'error',
                message: 'startDate must be before or equal to endDate'
            });
        }

        req.validatedDates = {
            startDate: start,
            endDate: end
        };
        
        next();
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Date validation failed',
            error: error.message
        });
    }
};

module.exports = {
    validateDateRange
};