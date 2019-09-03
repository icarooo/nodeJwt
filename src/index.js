const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');

app.use(cors);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/authController')(app);

require('./controllers/testeController')(app);

app.listen(3000);