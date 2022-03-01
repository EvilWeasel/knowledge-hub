const mongoose = require('mongoose')
// slugify is used to create human readable urls and to prevent duplicate urls
const slugify = require('slugify')
// marked is used to convert markdown to html
const marked = require('marked')
// dompurify is used to sanitize html
const createDomPurify = require('dompurify')
// JSDOM is a dependency for dompurify
// needed because node doesn't have a DOM
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

// Article Schema
// Describes the structure of an article to the database and the back-end
// Uses slugs for URL-Routing and human readable urls
// Also has the sanitized Html pre-proccessed, for fast loading on the client-side
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String
    },
    markdown:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml:{
        type: String,
        required: true
    }
})
// runs every time before saving to the database
// this is used to create a slug for the article
// this also works for updating the slug when the title changes :O
articleSchema.pre('validate', function(){
    if(this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    if(this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown))
    }
})

module.exports = mongoose.model('Article', articleSchema)