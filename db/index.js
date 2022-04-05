import mysql from 'mysql'

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA
})

export function makeQuery(query, values) {
    return new Promise((resolve, reject) => {
        db.connect()
        db.query(query, values, (error, results) => {
            if (error) {
                db.end()
                reject(error)
            } else {
                db.end()
                resolve(results)
            }
        })
    })
}
 