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
                quotesByAuthor.quotes.push(quote);
            }
        })
        res.send(quotesByAuthor)
    } else {
        let allQuotes = {
            quotes: quotes
        }
        res.send(allQuotes);
    }
});


app.post('/api/quotes', (req, res, next) => {
    let quote = {
        quote: req.query.quote,
        person: req.query.person
    };
    if (quote.person && quote.quote) {
        quotes.push(quote);
        res.status(201).send({quote});
    } else {
        res.status(400).send();
    }
})