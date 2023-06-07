import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()





//bobranie id oraz zdjęcia do wyświetlenia listy konstelacji
export async function getConstellations(){
    const [rows] = await pool.query(`
    SELECT constellations.id as id, img.link as link 
    FROM constellations join img on constellations.img_id=img.id `)
    return rows
}
//pobranie danych konkretnej gwiazdy do edycji
export async function getConstellation(id){
    const [rows] = await pool.query(`
    SELECT * 
    FROM constellations 
    where id = ?`,[id])
    return rows
}
//dodaniek nowej konstelacji
export async function newConstellation(name, description,img_id,moon,fog,cloudiness,precipitation){
    await pool.query(`
    INSERT INTO constellations 
    (id, name, description, img_id, moon, fog, cloudiness, precipitation) 
    VALUES (NULL, ?, ?, ?, ?, ?, ?, ?) 
    `,[name,description,img_id,moon,fog,cloudiness,precipitation])
}
//edycja konstelacji
export async function editConstellation(id,name, description,img_id,moon,fog,cloudiness,precipitation){
    await pool.query(`
    UPDATE constellations 
    SET 
    name = ?, 
    description = ?, 
    img_id = ?, 
    moon = ?, 
    fog = ?, 
    cloudiness = ?, 
    precipitation = ? 
    WHERE id = ? 
    `,[name,description,img_id,moon,fog,cloudiness,precipitation,id])
}
//usuniecie konstelacji
export async function delConstellation(id){
    await pool.query(`
    DELETE FROM stars 
    WHERE constellation_id= ?
    `,[id])
    await pool.query(`
    DELETE FROM constellations 
    WHERE id= ?
    `,[id])
}


//gwiazdy

//pobranie wszystich gwiazd 
export async function getStars(id){
    const [rows] = await pool.query(`
    SELECT stars.id as id, img.link as link 
    FROM img join stars on stars.img_id=img.id 
    WHERE constellation_id = ?
    `,[id])
    return rows
}
//pobranie konkretnej gwiazdy
export async function getStar(id){
    const [rows] = await pool.query(`
    SELECT * 
    FROM stars
    WHERE id = ?
    `,[id])
    return rows
}
//nowa gwiazda
export async function newStar(name, description,img_id,constellation_id,priority,active){
    await pool.query(`
    INSERT INTO stars
    (id, name, description, img_id, constellation_id, priority, active) 
    VALUES (NULL, ?, ?, ?, ?, ?, ?) 
    `,[name,description,img_id,constellation_id,priority,active])
}
//usuwanie gwiazdy
export async function delStar(id){
    await pool.query(`
    DELETE FROM stars 
    WHERE id= ?
    `,[id])
}
export async function editStar(name, description,img_id,priority,active,star_id){
    await pool.query(`
    UPDATE stars SET 
    name = ?, 
    description = ?, 
    img_id = ?, 
    priority = ?, 
    active = ? 
    WHERE id = ? 
    `,[name,description,img_id,priority,active,star_id])
}

export async function getImg(id){
    const [rows] = await pool.query(`
    SELECT * 
    FROM img
    WHERE type_id = ?
    `,[id])
    return rows
}
