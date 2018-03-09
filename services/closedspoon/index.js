const express = require('express');
const app = express();

app.all('/results', (req, res) => res.send('Hello World!'));

app.listen(8641, () => console.log('Example app listening on port 3000!'));