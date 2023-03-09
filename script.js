const quotePlaceholder = document.getElementById('quote');
const authorPlaceHolder = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const twitterButton = document.getElementById('twitter');
const quoteContainer = document.getElementById('quote-container');
const loader = document.getElementById('loader');
let randomQuote;
let apiQuotes = [];

function loading() {
    quoteContainer.hidden = true;
    loader.hidden = false;
}

function stopLoading() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes'
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote()
    stopLoading();
}

function newQuote() {
    randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    if(randomQuote.text.length > 100) {
        quotePlaceholder.style.fontSize = '2.4rem';
    }
    quotePlaceholder.textContent = randomQuote.text;
    if(randomQuote.author !== null) {
        authorPlaceHolder.textContent = '-' + randomQuote.author;
    } else {
        authorPlaceHolder.textContent = '-' + 'Unknown';
    }
}

function shareOnTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${randomQuote.text} - ${randomQuote.author}`, '_blank');
}

newQuoteButton.addEventListener('click', getQuotes);
twitterButton.addEventListener('click', shareOnTwitter);

getQuotes()