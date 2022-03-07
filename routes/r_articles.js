const express = require('express');
const router = express.Router();
const Article = require('../models/article');


// default route for articles
// mongooses find method returns all documents in the collection
// if no query is passed in
router.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { title: 'Home', articles: articles });
});

// new article route
// returns a form to edit the given article
// the form is rendered as a partial in the new view
router.get('/new', (req, res) => {
    res.render('articles/new', { title: 'New Article', article: new Article() });
});

// edit article route
// returns a form to create a new article
// the form is rendered as a partial in the new view
router.get('/edit/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    res.render('articles/edit', { title: 'Edit Article', article: article });
});



// show article with id route
// mongoose findById method returns a single document
// refacotring when turning from ugly mongo-ids to slugs
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if (article === null) res.redirect('/', { error: `Article "${req.params.slug}" not found` });
    res.render('articles/show', { title: req.params.slug, article: article });

})

// create article route
// mongoose create method returns a new document
// refactored for using custom middleware, towards end of file
router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'));


router.put('/:slug', async (req, res, next) => {
    req.article = await Article.findOne({ slug: req.params.slug })
    next()
}, saveArticleAndRedirect('edit'));

// delete article route
// is used with method-override inside form because using button or anchor-tag
// with delete could result in web-crawlers finding the site, crawling through all the links
// on the site and deleting the entire database -_-
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/articles');
})

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            res.render(`articles/${path}`, { article: article })
        }
    }
}

// possibly not the best solution, but it works
// should be client-sided filtering
router.post('/search/', async (req, res) => {
    try {
        let articles = await (await Article.find()).filter(article => article.title.toLowerCase().includes(req.body.query.toLowerCase()))
        res.redirect(`/articles/${articles[0].slug}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})


module.exports = router;