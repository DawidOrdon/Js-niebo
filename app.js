import express from "express"

import { getStars, getStar } from "./database.js"

const app = express()

app.get("/notes", async (req,res) => {
    const stars = await getStars()
    res.send(stars)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('server running at 8080 port')
})
  