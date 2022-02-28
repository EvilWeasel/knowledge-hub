const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    const articles = [{
        title: 'testArticle',
        createdAt: Date.now,
        description: 'testDescription'
    }]
    res.render('index', {title: 'Home', articles: articles});
});


module.exports = router;