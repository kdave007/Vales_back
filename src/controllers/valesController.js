const ValesModel = require('../models/valesModel');
const Database = require('../config/dbConfig');

// Create database instance and model with dependency injection
const db = Database.getInstance();
const valesModel = new ValesModel(db);

const getbyDate = async (req, res) => {
    const { startDate, endDate } = req.validatedDates;
    try {
        let result = await valesModel.getbyDate(startDate, endDate);
        result = sort(result);

        return res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (err) {
        console.error('Error in getbyDate:', err);
        return res.status(500).json({
            status: 'error',
            message: 'Database error',
            error: err.message
        });
    }
};

const getLatest = async (req, res) => {
    try {
        let result = await valesModel.getLatest();
        result = sort(result);

        return res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (err) {
        console.error('Error in getLatest:', err);
        return res.status(500).json({
            status: 'error',
            message: 'Database error',
            error: err.message
        });
    }
};

const sort = (data) => {
    const sortedData = [];

    for(let i = 0; i < data.length; i++){
        
        let partition = {
            id_documento:  data[i].id_documento,
                pa_id:  data[i].pa_id,
                clave:  data[i].clave,
                cantidad:  data[i].cantidad,
                costo:  data[i].costo,
                precio:  data[i].precio,
                impuesto:  data[i].impuesto
        }
        let header = {
            ca_id: data[i].ca_id,
            llave: data[i].llave,
            cve_origen_pos: data[i].cve_origen_pos,
            cve_destino_pos: data[i].cve_destino_pos,
            documento_numero: data[i].documento_numero,
            documento_fecha: data[i].documento_fecha,
            documento_motivo: data[i].documento_motivo,
            documento_asociado: data[i].documento_asociado,
            salida_estado: data[i].salida_estado,
            fecha_descarga: data[i].fecha_descarga,
        }

        let foundHeader = sortedData.find(element => element.ca_id === data[i].ca_id);

        if(!foundHeader){
            header['partes'] = [partition];
            sortedData.push(header);
        } else {
            foundHeader.partes.push(partition)
        }
        
    }
    
    // sortedData.forEach( element => {
    //     console.log(element);
        
    // })
        return sortedData;
}

module.exports = {
    getbyDate,
    getLatest
};