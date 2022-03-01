const express = require('express');
const router = express.Router();
const Article = require('../models/article');


// default route for articles
// mongooses find method returns all documents in the collection
// if no query is passed in
router.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'});
    res.render('articles/index', {title: 'Home', articles: articles});
});

// new article route
// returns a form to create a new article
// the form is rendered as a partial in the new view
router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()});
});

// show article with id route
// mongoose findById method returns a single document
// refacotring when turning from ugly mongo-ids to slugs
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug});
    if(article === null) res.redirect('/', {error: `Article "${req.params.slug}" not found`});
    res.render('articles/show', {article: article});
        
})

// create article route
// mongoose create method returns a new document
router.post('/', async (req, res) =>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
        article = await article.save()
        res.redirect(`/articles/${article.slug}`)
    }catch(e){
        console.log(e)
        res.render('articles/new', {article: article})
    }
})

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/articles');
})



module.exports = router;