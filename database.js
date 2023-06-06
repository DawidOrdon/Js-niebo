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
export async function getConstellations(){
    const [rows] = await pool.query(`
    SELECT constellations.id as id, img.link as link 
    FROM constellations join img on constellations.img_id=img.id `)
    return rows
}

export async function newStar(name, description,img_id,constellation_id){
    await pool.query(`
    INSERT INTO stars 
    (id, name, description, img_id, constellation_id) 
    VALUES (NULL, ?, ?, ?, ?) 
    `,[name,description,img_id,constellation_id])
}

export async function getImg(id){
    const [rows] = await pool.query(`
    SELECT * 
    FROM img
    WHERE type_id = ?
    `,[id])
    return rows
}
