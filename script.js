const url = "http://localhost:5000/api/news?q=";  // proxy backend

// Fetch news from backend
async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}`);
        const data = await res.json();

        // Some APIs use "articles", some use "results"
        const articles = data.articles || data.results || [];
        bindData(articles);
    } catch (err) {
        console.error("Error fetching news:", err);
        bindData([]); // Show "No news" if error
    }
}

// Load default news on page load
// Load default news on page load
window.addEventListener('load', () => fetchNews("technology"));


function reload() {
    window.location.reload();
}

const MAX_ARTICLES = 12;

// Shuffle helper
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Bind data to cards
function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    const noNewsMessage = document.getElementById('no-news-message');
    
    cardsContainer.innerHTML = '';

    const filteredArticles = articles.filter(article => article.image_url);

    shuffleArray(filteredArticles);

    const limitedArticles = filteredArticles.slice(0, MAX_ARTICLES);

    if (limitedArticles.length === 0) {
        noNewsMessage.style.display = 'block';
        return;
    } else {
        noNewsMessage.style.display = 'none';
    }

    limitedArticles.forEach(article => {
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

// Fill content into news card
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    // ✅ newsdata.io uses image_url, not urlToImage
    newsImg.src = article.image_url || "https://placehold.co/400x200";
    newsTitle.innerHTML = article.title || "No title available";
    newsDesc.innerHTML = article.description || "No description available";

    // ✅ newsdata.io uses pubDate and source_id
    const date = article.pubDate 
        ? new Date(article.pubDate).toLocaleString("en-US", { timeZone: "Asia/Jakarta" }) 
        : "Unknown date";

    const sourceName = article.source_id || "Unknown source";
    newsSource.innerHTML = `${sourceName} · ${date}`;

    // ✅ newsdata.io uses link, not url
    cardClone.firstElementChild.addEventListener('click', () => {
        if (article.link) {
            window.open(article.link, "_blank");
        }
    });
}

 

// Navigation category click
let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    if (curSelectedNav) curSelectedNav.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

// Search handling
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value.trim();
    if (!query) return;
    fetchNews(query);
    if (curSelectedNav) curSelectedNav.classList.remove('active');
    curSelectedNav = null;
});

searchText.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        const query = searchText.value.trim();
        if (!query) return;
        fetchNews(query);
        if (curSelectedNav) curSelectedNav.classList.remove('active');
        curSelectedNav = null;
    }
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
