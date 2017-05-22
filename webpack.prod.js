/**
 * WebPack Boilerplate pour projet NodeJS
 * @author Lior Chamla
 * @see Wes Bos LearNode.com
 */

const path = require('path'); // Package node qui permet de gérer les chemins des fichiers
const webpack = require('webpack'); // Package node qui permet d'utiliser WebPack
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // Plugin WebPack pour l'exctraction de code CSS
const autoprefixer = require('autoprefixer'); // Package node qui permet d'autoprefixer les propriétés css

/**
 * WebPack Handlers : on gère les différents types de fichiers
 */

/**
 * Gestion du Javascript 
 */
const javascript = {
  test: /\.(js)$/, // Tous les fichiers .js
  use: [{
    loader: 'babel-loader', // Utilisation du plugin babel-loader pour gérer l'ES2015
    options: { presets: ['es2015'] } 
  }],
};


/**
 * PostCSS loader qui permettra de lancer l'autoprefixer après génération des css
 */
const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]; }
  }
};

const cssloader= {
    loader: 'css-loader',
    options: {
        minimize: true
    }
};

/**
 * Gestion des fichiers SCSS grâce à sass-loader, postcss, css-loader
 */
const styles = {
  test: /\.(scss)$/,
  // here we pass the options as query params b/c it's short.
  // remember above we used an object for each loader instead of just a string?
  // We don't just pass an array of loaders, we run them through the extract plugin so they can be outputted to their own .css file
  use: ExtractTextPlugin.extract([cssloader, postcss, 'sass-loader'])
};

/**
 * WebPack uglify pour Uglifier nos fichiers JS
 */
const uglify = new webpack.optimize.UglifyJsPlugin({ // eslint-disable-line
  compress: true
});

/**
 * WebPack config
 */
const config = {
  entry: {
    // Le point d'entrée sera app.js
    app: './public/js/app.js'
  },
  // On utilisera source-map qui permettra de garder un trace des fichiers originaux même après minification
  devtool: 'source-map',
  // Output files
  output: {
    // On utilise path pour dire que les fichiers finaux seront dans le répertoire public/dist
    path: path.resolve(__dirname, 'public', 'dist'),
    // we can use "substitutions" in file names like [name] and [hash]
    // name will be `App` because that is what we used above in our entry
    filename: '[name].min.js'
  },

  // On passe ici les règles qu'on a créé plus haut pour gérer le js et les styles
  module: {
    rules: [javascript, styles]
  },
  // Enfin on passe les plugins que l'on souhaite utiliser
  plugins: [
    // Ici on demande simplement que les styles soient dans un fichier style.css
    new ExtractTextPlugin('style.css'),
    uglify
  ]
};
// webpack is cranky about some packages using a soon to be deprecated API. shhhhhhh
// process.noDeprecation = true;

module.exports = config;
