/**
 * Model de démo pour gérer les "Pages"
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Gestion des promesses de Mongoose
const slug = require('slugs'); // Le model aura besoin de gérer des slugs

/**
 * Page Schema
 */
const pageSchema = new mongoose.Schema({
    title: { 
        type: String,
        trim: true,
        required: "Entrez un titre !"
    },
    subtitle: { 
        type: String,
        trim: true
    },
    slug: String,
    text: {
        type: String,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    image: String
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes du Schema
pageSchema.index({
  title: 'text',
  text: 'text'
});

// Pre-save Hook pour gérer les slugs
pageSchema.pre('save', async function(next){
  if(!this.isModified('title')){
    next(); // Ne rien faire
    return;
  }
  
  // Créer le slug
  this.slug = slug(this.title);
  
  // Si d'autres pages ont le même slug :
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const pagesWithSlug = await this.constructor.find({slug: slugRegEx});
  if(pagesWithSlug.length){
    // On génère un slug numéroté
    this.slug = `${this.slug}-${pagesWithSlug.length + 1}`; 
  }
  
  next();
});

module.exports = mongoose.model('Page', pageSchema);