const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const config = require('./config/config.json')
const morgan = require('morgan')
const app = express()

app.use(morgan('combined'))

// define the home page route
router.get('/', (req,res) => {
    res.send('Ok');
})
app.use('/', router)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//
const apiAuth = require('./routes/auth')
app.use('/auth', apiAuth)
//
const apiRoutes = require('./routes/main')
app.use('/api', apiRoutes)

const PORT = config.appPort;
app.listen(PORT, () => {
  	console.log(`Server is running on port ${PORT}.`);
});