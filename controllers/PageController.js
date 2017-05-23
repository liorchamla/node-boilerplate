exports.home = (req, res, next) => {
    res.render('homepage.pug', {title: "Home", herotitle: "Lior's Boilerplate", herosubtitle: "Node, Express, Pug, Webpack, Bulma"});
}