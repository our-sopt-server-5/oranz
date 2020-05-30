const pool = require('../modules/pool');
const table = 'user';

const user = {
    signup: async (id, name, password, salt, email) => {
        const fields = 'id, name, password, salt, email';
        const questions = `?, ?, ?, ?, ?`;
        const values = [id, name, password, salt, email];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            console.log(result);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },

    checkUser: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;
            } else return true;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('checkUser ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },

    checkPW: async (id, password) => {
        const query = `SELECT password FROM ${table} WHERE id="${id}"`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0 || password !== result[0].password) {
                return false;
            } else return true;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('checkPW ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('checkPW ERROR : ', err);
            throw err;
        }
    },

    signin: async (id, password) => {
        const fields = 'id, password';
        const query = `SELECT ${fields} FROM ${table} WHERE id=${id}, password=${password}`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;
            } else return true;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signin ERROR: ', err.errno, err.code);
                return -1;
            }
            console.log("signin ERROR: ", err);
            throw err;
        }
    },

    getUserById: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getUserById ERROR: ', err.errno, err.code);
                return -1;
            }
            console.log("getUserById ERROR: ", err);
            throw err;
        }
    }
}

module.exports = user;