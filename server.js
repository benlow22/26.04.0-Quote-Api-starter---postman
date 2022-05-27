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
    const randomQuoteElement = { quote: getRandomElement(quotes)};
    res.send(randomQuoteElement);
});

app.get('/api/quotes', (req, res, next) => {
    let author = req.query;
    if (author.person) {
        const quotesByAuthor = { quotes:[]}
        quotes.forEach(quote => {
            if (quote.person === author.person) {
                quotesByAuthor.quotes.push(quote.quote)
            }
        })
        res.send(quotesByAuthor)
    } else {
        res.send(quotes);
    }
});


app.post('/api/quotes', (req, res, next) => {
    let newQuote = req.query;
    if (newQuote.person && newQuote.quote) {
        quotes.push(newQuote);
        res.status(201).send(newQuote);
    } else {
        res.status(400).send();
    }
})