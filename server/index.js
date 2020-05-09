
const path = require('path');
const fs = require('fs');

const React = require('react');
const express = require('express');
const ReactDOMServer = require('react-dom/server');

const App = require('../src/App');

const PORT = process.env.PORT || 8282;
const app = express();

app.use(express.static('./build'));

app.get('/', (req, res) => {
    const app = ReactDOMServer.renderToString(<App />);

    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );
    });
});

app.get('/hello', (req, res) => {
    res.send({data: 'data'})
})

app.listen(PORT, () => {
    console.log(`😎 Server is listening on port ${PORT}`);
});