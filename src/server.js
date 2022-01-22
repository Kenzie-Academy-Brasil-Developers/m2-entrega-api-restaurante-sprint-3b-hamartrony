const app   = require('./app')
const cors  = require('cors') 

app.use(cors())
const port = 3000

app.listen(process.env.PORT || port, () => {
    console.log(`Server is Run at Port ${port}`)
})