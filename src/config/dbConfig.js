const { Pool } = require('pg');
require('dotenv').config();

class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }

        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT || 5432,
            max: 5,
            idleTimeoutMillis: 30000
        });

        Database.instance = this;
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    async connect() {
        try {
            await this.pool.connect();
            console.log('Database connected successfully');
        } catch (error) {
            console.error('Database connection error:', error);
            throw error;
        }
    }

    getPool() {
        return this.pool;
    }

    async end() {
        if (this.pool) {
            await this.pool.end();
            console.log('Database connection closed');
        }
    }
}

module.exports = Database;
