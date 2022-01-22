const express        = require('express')
const app            = express()
const router         = require('./routes/produto')
const routerOrder    = require('./routes/mesa')



app.use(express.json())
app.use('/product', router)
app.use('/order', routerOrder)






module.exports = app