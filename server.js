import express from "express"

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')

import { getStars, getStar, newStar, getImg, getConstellations, getConstellation, newConstellation, delConstellation } from "./database.js"

app.get('/', async (req, res) =>{
    const img = await getImg(2)
    const moon = await getImg(3)
    const constellations = await getConstellations()
    res.render('new_constellation', {img, moon, constellations})
})

app.post('/add', async (req, res) =>{
    newConstellation(req.body.name,req.body.description,req.body.img,req.body.moon,req.body.fog,req.body.cloudiness,req.body.precipitation)
    res.redirect('/')
})


app.get('/:id', async (req, res) =>{
    const img = await getImg(2)
    const moon = await getImg(3)
    const id = req.params.id
    const constellation = await getConstellation(id)
    const constellations = await getConstellations(id)
    console.log(constellation[0].name)
    res.render('new_constellation', {img, moon, constellation, constellations})
})

app.post('/:id/edit', async (req, res) =>{
    res.send('new user' + req.body.name)
    console.log(req.body.name,req.body.img)
})

app.get('/:id/del', async (req, res) =>{
    const id = req.params.id
    delConstellation(id)
    res.redirect('/')
})



app.get('/stars', async (req, res) =>{
    const stars = await getStars()
    res.render('stars', {stars})
})

app.get('/new_stars', (req, res) =>{
    res.render('new_star')
})



app.post('/new_stars',(req, res) => {
    res.send('new user' + req.body.name)
    console.log(req.body.name)
    newStar(req.body.name,req.body.description,req.body.img_id,req.body.constelation_id)
})



app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('server running at 8080 port')
})
  