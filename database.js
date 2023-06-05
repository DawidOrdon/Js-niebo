import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getStars(){
    const [rows] = await pool.query("select * from stars")
    return rows
}

export async function getStar(id){
    const [rows] = await pool.query(`
    SELECT * 
    FROM stars
    WHERE id = ?
    `,[id])
    return rows
}

const stars = await getStar(1)
console.log(stars)