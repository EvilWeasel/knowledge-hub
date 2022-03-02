$(document).ready(function() {
    let articleCards = $('.cards')
    let query
    $('#query').keyup(function() {
        query = $(this).val();
        articleCards.each(function() {
            if ($(this).text().search(new RegExp(query, "i")) < 0) {
                $(this).fadeOut();
            } else {
                $(this).fadeIn();
            }
        })
    })
})

