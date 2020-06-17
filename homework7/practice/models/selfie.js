const pool = require('../modules/pool');
const table = 'selfies';

const selfie = {
    updateSelfie: async (userIdx, selfie) => {
        const fields = 'userIdx, selfie';
        const questions = '?, ?';
        const values = [userIdx, selfie];
        let query = `INSERT INTO ${table} (${fields}) VALUES (${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            return result;
        } catch (err) {
            console.log('update selfies ERROR: ', err);
            throw err;
        }
    }
}

module.exports = selfie;