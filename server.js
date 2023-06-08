import express from "express"

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')

import { getStars, getStar, newStar, getImg, getConstellations, getConstellation, newConstellation, delConstellation, editConstellation, delStar, editStar, getMoon } from "./database.js"

//konstelacje

//generowanie pierwszego widoku z formem do dodawania konstelacji
app.get('/', async (req, res) =>{
    const img = await getImg(2)
    const moon = await getImg(3)
    const constellations = await getConstellations()
    res.render('constellation', {img, moon, constellations})
})

//generowanie widoku z gwiazdami i formem do edycji
app.get('/:id', async (req, res) =>{
    const img = await getImg(2)
    const moon = await getImg(3)
    const id = req.params.id
    const constellation = await getConstellation(id)
    const constellations = await getConstellations(id)
    res.render('constellation', {img, moon, constellation, constellations})
})

//dodanie konstelacji
app.post('/add', async (req, res) =>{
    newConstellation(req.body.name,req.body.description,req.body.img,req.body.moon,req.body.fog,req.body.cloudiness,req.body.precipitation)
    res.redirect('/')
})

//edycja konstelacji
app.post('/:id/edit', async (req, res) =>{
    const id = req.params.id
    editConstellation(id,req.body.name,req.body.description,req.body.img,req.body.moon,req.body.fog,req.body.cloudiness,req.body.precipitation)
    res.redirect('/')
})

//usuwanie konstelacji
app.get('/:id/del', async (req, res) =>{
    const id = req.params.id
    delConstellation(id)
    res.redirect('/')
})

//gwiazdy

//generowanie forma do dodawnia gwiazd
app.get('/:id/stars', async (req, res) =>{
    const id = req.params.id //id konstelacji
    const img = await getImg(1) //pobranie zdjec gwiazd
    const stars = await getStars(id) //pobranie gwiazd
    const constellation = await getConstellation(id)
    const moon = await getMoon(constellation[0].moon)
    console.log(constellation[0].fog)
    console.log(constellation[0].cloudiness)
    console.log(constellation[0].precipitation)
    
    
    res.render('stars', {img, stars, id, moon, constellation })
})
//generowanie forma do edycji gwiazd
app.get('/:id/stars/:star_id', async (req, res) =>{
    const id = req.params.id
    const star_id = req.params.star_id
    const img = await getImg(1)
    const stars = await getStars(id)
    const star = await getStar(star_id)
    const constellation = await getConstellation(id)
    const moon = await getMoon(constellation[0].moon)
    res.render('stars', {img, stars, id, star, moon, constellation})
})
//dodawanie gwiazdy
app.post('/:id/stars/add', async (req, res) =>{
    const id = req.params.id
    var active = Boolean(req.body.active)
    newStar(req.body.name,req.body.description,req.body.img,id,req.body.priority,active)
    res.redirect('/'+id+'/stars')
})
//edycja gwiazdy
app.post('/:id/stars/:star_id/edit', async (req, res) =>{
    const id = req.params.id
    const star_id = req.params.star_id
    var active = Boolean(req.body.active)
    editStar(req.body.name,req.body.description,req.body.img,req.body.priority,active,star_id)
    res.redirect('/'+id+'/stars')
})
//usuwanie gwiazdy z konstelacji
app.get('/:id/stars/:star_id/del', async (req, res) =>{
    const id = req.params.id
    const star_id = req.params.star_id
    delStar(star_id)
    res.redirect('/'+id+'/stars')
})






app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('server running at 8080 port')
})
  