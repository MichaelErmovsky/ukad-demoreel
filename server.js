const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, 'build');

const port = process.env.PORT || 3000;
app.use('/public', express.static(publicPath));
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: publicPath});
});
app.listen(port, () => {
    console.log('Server is up!');
});