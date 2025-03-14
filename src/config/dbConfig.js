const { Pool } = require('pg');
require('dotenv').config();

class Database {
    constructor() {
        this.pool = null;
        this.isConnected = false;
    }

    async connect() {
        try {
            if (!this.pool) {
                this.pool = new Pool({
                    user: process.env.DB_USER,
                    host: process.env.DB_HOST,
                    database: process.env.DB_NAME,
                    password: process.env.DB_PASSWORD,
                    port: process.env.DB_PORT || 5432,
                    max: 5,
                    idleTimeoutMillis: 30000
                });

                this.pool.on('connect', () => {
                    this.isConnected = true;
                    console.log('Connected to PostgreSQL');
                });

                this.pool.on('error', (err) => {
                    this.isConnected = false;
                    console.error('Unexpected error on idle client', err);
                });

                // Test the connection
                await this.pool.query('SELECT NOW()');
            }
            return this;
        } catch (error) {
            console.error('Failed to connect to PostgreSQL:', error);
            throw error;
        }
    }

    getPool() {
        if (!this.pool || !this.isConnected) {
            throw new Error('Database not connected. Call connect() first.');
        }
        return this.pool;
    }

    async end() {
        if (this.pool) {
            await this.pool.end();
            this.isConnected = false;
            this.pool = null;
        }
    }
}

module.exports = Database;
