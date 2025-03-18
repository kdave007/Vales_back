const Database = require('../config/dbConfig');

class DataModel {
    constructor(db = Database.getInstance()) {
        this.db = db;
        this.pool = this.db.getPool();
    }

    async getbyRange(range) {
        try {
            const query = {
                text: 'SELECT local_rowid,fecha,no_consec,desc_mov FROM public.vales WHERE fecha BETWEEN $1 AND $2',
                values: [range.startDate, range.endDate]
            };
           
            const result = await this.pool.query(query);
           
            return result.rows;
        } catch (err) {
            console.error('Error in getbyRange:', err);
            throw new Error('Database query error: ' + err.message);
        }
    }

    async getLatest() {
        try {
            const query = {
                text: 'SELECT local_rowid,fecha,no_consec,desc_mov FROM public.vales ORDER BY fecha DESC LIMIT 100'
            };

            const result = await this.pool.query(query);
            return result.rows;
        } catch (err) {
            console.error('Error in getLatest:', err);
            throw new Error('Database query error: ' + err.message);
        }
    }
}

module.exports = DataModel;