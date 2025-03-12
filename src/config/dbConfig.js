const { Pool } = require('pg');
require('dotenv').config();

class Database {

    constructor(){
        this.pool = null;
        this.isConnected = false;
    }

    connect(){
        if (!this.pool){
            this.pool = new Pool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                port: process.env.DB_PORT || 5432,
                max: 5, // Connection pool size
                idleTimeoutMillis: 30000
            });

            this.pool.on('connect', () => console.log('Connected to PostgreSQL'));
            this.pool.on('error', (err) => console.log('Error connecting to PostgreSQL',err));
        }

        return this;
    }

    getPool(){
        if(!this.pool) return false;
        return this.pool; 
    }


}

module.exports = Database;





