/**
 * Controller de démo : Pages - gestion des pages
 */

const mongoose = require('mongoose');
const Page = mongoose.model('Page');

/**
 * Affichage de la homepage
 */
exports.home = (req, res, next) => {
    res.render('homepage', {
        title: "Home", 
        herotitle: "Lior's Boilerplate", 
        herosubtitle: "Node, Express, Pug, Webpack, Bulma"
    });
}

/**
 * Affichage du formulaire d'ajout de Page
 */
exports.form = (req, res, next) => {
    res.render('pages/form', {
        title: "Créer une nouvelle page", 
        subtitle: "Remplissez le formulaire ci-dessous"
    });
}

/**
 * Affichage de la liste des pages
 */
exports.index = async (req, res, next) => {
    const pages = await Page.find();
    res.render('pages/index', {
        title: "Liste des pages", 
        pages
    });
}

/**
 * Affichage d'une page en particulier
 */
exports.show = async (req, res, next) => {
    const page = await Page.findOne({slug: req.params.slug});
    res.render('pages/show', {
        title: page.title, 
        page
    });
}

/**
 * Création d'une page (via formulaire POST)
 */
exports.create = async (req, res, next) => {
    const page = new Page(req.body);
    await page.save();
    res.redirect(`/post/${page.slug}`);
}
