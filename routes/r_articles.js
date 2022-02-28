const express = require('express');
const router = express.Router();
const Article = require('../models/article');


router.get('/', (req, res) => {
    const articles = [{
        title: 'testArticle',
        createdAt: new Date(),
        description: 'testDescription'
    }]
    res.render('articles/index', {title: 'Home', articles: articles});
});

// new article route
router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()});
});

// show article with id route
router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

router.post('/', async (req, res) =>{
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    }catch(e){
        console.log(e)
        res.render('articles/new', {article: article})
    }
})



module.exports = router;