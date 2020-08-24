const express = require('express')
const router = express.Router();
const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Load env

dotenv.config({ path: './config.env'})

// This route retrieves the parameters we need to be able to 
// make a get request to the API
// lat & long to be passed as arguments in url from front end
router.get('/:long/:lat', async (req, res) => {
    // console.log(req.params.long, req.params.lat);
    // res.send('Hello');
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const key = process.env.OWM_API_KEY
        const {long, lat } = req.params  
        // construct query to external API
        // const proxy = 'http://cors-anywhere.herokuapp.com/'
        const response = await fetch(`${process.env.OWM_API_URL}lat=${lat}&lon=${long}&appid=${key}`);

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server Error'
        })
    }
   
})

module.exports = router;
