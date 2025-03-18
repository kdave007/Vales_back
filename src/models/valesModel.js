const { text } = require('express');
const Database = require('../config/dbConfig');

class ValesModel {
    constructor(db = Database.getInstance()){
        this.db = db;
        this.pool = this.db.getPool();
    }

    async getbyDate(startDate,endDate){
        try{
            const query = {
                text: `
                    SELECT 
                        cdca.id as ca_id, 
                        cdca.llave, 
                        cdca.cve_origen_pos, 
                        cdca.cve_destino_pos, 
                        cdca.documento_numero, 
                        cdca.documento_fecha, 
                        cdca.documento_motivo, 
                        cdca.documento_asociado, 
                        cdca.salida_estado, 
                        cdca.fecha_descarga,
                        cdpa.id_documento, 
                        cdpa.id as pa_id, 
                        cdpa.clave, 
                        cdpa.cantidad, 
                        cdpa.costo, 
                        cdpa.precio, 
                        cdpa.impuesto
                    FROM 
                        public.cruce_documento_ca cdca
                    LEFT JOIN 
                        public.cruce_documento_pa cdpa
                    ON 
                        cdca.id = cdpa.id_documento
                    WHERE 
                        cdca.documento_fecha BETWEEN $1 AND $2
                    LIMIT 100;
                `,
                values:[startDate,endDate]
            }

            const result = await this.pool.query(query);
            return result.rows;
        } catch (err) {
            console.error('Error in getbyDate:', err);
            throw new Error('Database query error: ' + err.message);
        }
    }

    async getLatest(){
        try{
            const query = {
                text: `
                    SELECT 
                        cdca.id as ca_id, 
                        cdca.llave, 
                        cdca.cve_origen_pos, 
                        cdca.cve_destino_pos, 
                        cdca.documento_numero, 
                        cdca.documento_fecha, 
                        cdca.documento_motivo, 
                        cdca.documento_asociado, 
                        cdca.salida_estado, 
                        cdca.fecha_descarga,
                        cdpa.id_documento, 
                        cdpa.id as pa_id, 
                        cdpa.clave, 
                        cdpa.cantidad, 
                        cdpa.costo, 
                        cdpa.precio, 
                        cdpa.impuesto
                    FROM 
                        public.cruce_documento_ca cdca
                    LEFT JOIN 
                        public.cruce_documento_pa cdpa
                    ON 
                        cdca.id = cdpa.id_documento
                    LIMIT 100;
                `,
                values:[]
            }

            const result = await this.pool.query(query);
            return result.rows;
        } catch (err) {
            console.error('Error in getLatest:', err);
            throw new Error('Database query error: ' + err.message);
        }
    }

}

module.exports = ValesModel;