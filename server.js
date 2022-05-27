const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
})


app.get('/api/quotes/random', (req, res, next) => {
    const randomQuoteElement = getRandomElement(quotes);
    res.send(randomQuoteElement);
});

app.get('/api/quotes', (req, res, next) => {
    let author = req.query;
    if (author.person) {
        const quotesByAuthor = []
        quotes.forEach(quote => {
            if (quote.person === author.person) {
                quotesByAuthor.push(quote.quote)
            }
        })
        res.send(quotesByAuthor)
    } else {
        res.send(quotes);
    }
});


app.post('/api/quotes', (req, res, next) => {
    
})