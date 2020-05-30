const pool = require('../modules/pool');
const table = 'post';

const post = {
    getAllPost: async () => {
        const query = `SELECT * FROM ${table}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getAllPost ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getAllPost ERROR : ', err);
            throw err;
        }
    },

    createPost: async (idx, author, title, content, created_at, userIdx) => {
        const fields = 'idx, author, title, content, created_at, userIdx';
        const questions = `?, ?, ?, ?, ?, ?`;
        const values = [idx, author, title, content, created_at, userIdx];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('createPost ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('createPost ERROR : ', err);
            throw err;
        }
    },

    getPost: async (idx) => {
        const query =  `SELECT * FROM ${table} WHERE idx="${idx}"`;
        try {
            const result = await pool.queryParam(query);
            const author = result[0].author;
            const title = result[0].title;
            const content = result[0].content;
            const created_at = result[0].created_at;

            return {author, title, content, created_at};
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getPost ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getPost ERROR : ', err);
            throw err;
        }
    },

    checkPost: async (idx) => {
        const query = `SELECT * FROM ${table} WHERE idx="${idx}"`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return false;
            } else return true;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('checkPost ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('checkPost ERROR : ', err);
            throw err;
        }
    },

    getLastIdx: async () => {
        const query = `SELECT idx FROM ${table}`;
        try {
            const result = await pool.queryParam(query);
            if (result.length === 0) {
                return -1;
            } else {
                lastIdx = result[result.length - 1].idx;
                return lastIdx;
            }
        } catch (err) {
            if (err.errno == 1062) {
                console.log('getLastIdx ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getLastIdx ERROR : ', err);
            throw err;
        }
    },

    updatePost: async (idx, author, title, content) => {

        const query = `UPDATE ${table} SET author="${author}", title="${title}", content="${content}" WHERE idx=${idx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('updatePost ERROR: ', err.errno, err.code);
                return -1;
            }
            console.log("updatePost ERROR: ", err);
            throw err;
        }
    },

    deletePost: async (idx) => {
        const query = `DELETE FROM ${table} WHERE idx="${idx}"`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('deletePost ERROR: ', err.errno, err.code);
                return -1;
            }
            console.log("deletePost ERROR: ", err);
            throw err;
        }
    }
}

module.exports = post;