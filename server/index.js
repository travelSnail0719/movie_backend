const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World NodeJs'));

app.listen(port, () => console.log(`let's start listening on port ${port}`));