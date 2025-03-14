const Database = require('../config/dbConfig');

class DataModel {
    constructor() {
        this.db = new Database();
    }

    async getDatabyRange(range) {
        try {
            await this.db.connect();
            const pool = this.db.getPool();
            
            const query = {
                text: 'SELECT * FROM your_table WHERE date BETWEEN $1 AND $2',
                values: [range.startDate, range.endDate]
            };

            const result = await pool.query(query);
            return result.rows;
        } catch (err) {
            console.error('Error in getDatabyRange:', err);
            throw new Error('Database query error: ' + err.message);
        }
    }

    async end() {
        await this.db.end();
    }
}

module.exports = DataModel;