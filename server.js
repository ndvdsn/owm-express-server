const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load env

dotenv.config({ path: './config.env'})

const app = express();

// Dev Logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// profile routes
app.use('/api/v1/weather', require('./routes/profile'))

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
})