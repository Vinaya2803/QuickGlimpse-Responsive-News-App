# QuickGlimpse 📰

A responsive news web application that fetches and displays up-to-date news headlines using the [NewsData.io](https://newsdata.io/) service. Users can search for topics, browse news by category (e.g., IPL, Finance, Politics, India), or view current-day news with a single click.

## ✨ Features

- 🔍 Search news by keyword
- 🇮🇳 Quick category tabs (e.g., India, IPL, Politics,Finance)
- 🃏 Randomly shuffled articles
- 📱 Responsive design with a mobile-friendly navbar
- 🔗 Clickable cards that open full articles
-  Proxy backend to **secure API key**  
   

## 🚀 Tech Stack  

### **Frontend (Client-side)**  
- **HTML5** – structure of the application  
- **CSS3** – responsive design & styling  
- **JavaScript (Vanilla JS)** – fetch API, dynamic DOM updates, and search/filter functionality  

### **Backend (Server-side)**  
- **Node.js** – runtime environment  
- **Express.js** – to create REST API routes  
- **node-fetch** – to fetch news data from API  
- **CORS** – enable cross-origin requests  
- **dotenv** – manage API keys securely  

### **API Used**  
- [**Newsdata.io API**](https://newsdata.io/) – for fetching real-time news  

---


## 📥 Installation & Setup  

Follow these steps to run the project locally:  

### 1️⃣ Clone or Download the Repository  
 
```bash
git clone https://github.com/your-username/news-web-app.git
cd news-web-app
```

Install Requirements

Make sure you have Node.js (v16+) and npm installed.
Check with:
```bash
node -v
npm -v
```

Then install dependencies:
```bash
npm install express node-fetch dotenv cors
```
Setup Environment Variables

Create a .env file in the root directory:

NEWS_API_KEY=your_api_key_here


👉 Get your API key from [Newsdata.io](https://newsdata.io/) 


Run Backend Server
Start your Express backend:
```bash
node server.js
```

Server runs at:
http://localhost:5000

Run Frontend
Open index.html in your browser (just double-click it).
It will connect to the backend (http://localhost:5000/api/news) to fetch and display news.



