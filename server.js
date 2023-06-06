import express from "express"

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')

import { getStars, getStar, newStar, getImg, getConstellations } from "./database.js"

app.get('/', (req, res) =>{
    res.render('index', { stars: getStars})
})

app.get('/stars', async (req, res) =>{
    const stars = await getStars()
    res.render('stars', {stars})
})

app.get('/new_stars', (req, res) =>{
    res.render('new_star')
})

app.get('/test', async (req, res) =>{
    const img = await getImg(2)
    const moon = await getImg(3)
    const constellations = await getConstellations()
    res.render('constellation_form', {img, moon, constellations})
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
  