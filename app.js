const express = require('express');
const routes = require('./config/routes');
const path = require('path');
const app = express();


app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.h = {
        siteName: "Lior's Boilerplate - Node, Express, Pug, WebPack",
        headline: "Lior's Boilerplate"
    };
    next();
})

app.use('/', routes);

app.listen(process.env.PORT);
