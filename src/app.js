const express        = require('express')
const app            = express()
const router         = require('./routes/produto')
const router         = require('./routes/mesa')



app.use(express.json())
app.use('/product', router)
// app.use('/order', router)






module.exports = app