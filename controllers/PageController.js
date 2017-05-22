exports.home = (req, res, next) => {
    res.render('homepage.pug', {title: "Lior's Boilerplate !", subtitle: "Node, Express, Pug, Webpack, Bulma"});
}