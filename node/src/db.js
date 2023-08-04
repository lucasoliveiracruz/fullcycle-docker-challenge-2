const mysql = require('mysql');
const config = require('./config');

const Db = {
    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, PRIMARY KEY (id))`
        const connection = mysql.createConnection(config.DB)
        connection.query(sql)
        connection.end()
    },
    async addPerson(name) {
        const connection = mysql.createConnection(config.DB)

        const query = new Promise((res, reject) => {
            const sql = `INSERT INTO people(name) values('${name}')`
            connection.query(sql, (error, results) => {
                if (error) return reject('Não foi possível inserir a pessoa');
                res(`${name} inserido com sucesso!`)
            });
        });

        const result = await query;
        connection.end();
        return result;
    },
    async list() {
        const connection = mysql.createConnection(config.DB)
        const sql = 'SELECT id, name FROM people'

        const query = new Promise((resolve, reject) => {
            connection.query(sql, (error, results) => {
                if (error) {
                    return reject(new Error('Não foi possível encontrar nada'));
                }
                resolve(results)
            });
        })

        const result = await query;
        connection.end();
        return result;
    }
}

module.exports = Db