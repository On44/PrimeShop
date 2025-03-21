import React from "react";
import { Link } from "react-router-dom";
import "./News.css"; // Ensure CSS file name matches

const News = () => {
  // Sample news articles (replace with API data in production)
  const newsArticles = [
    {
      id: 1,
      title: "New Summer Collection Launch!",
      date: "February 15, 2025",
      excerpt: "Discover our latest summer fashion collection featuring vibrant colors and trendy designs. Available now at Prime Boutique.",
      link: "/news/summer-collection",
    },
    {
      id: 2,
      title: "20% Off All Watches Promotion",
      date: "February 10, 2025",
      excerpt: "Enjoy a 20% discount on all wrist watches until March 1, 2025. Don’t miss out on this exclusive offer!",
      link: "/news/watches-promo",
    },
    {
      id: 3,
      title: "Prime Boutique Expands to New Markets",
      date: "February 5, 2025",
      excerpt: "We’re excited to announce our expansion into Europe and Asia, bringing stylish fashion to more customers worldwide.",
      link: "/news/expansion",
    },
  ];

  return (
    <div className="news-page content" aria-label="Prime Boutique Latest News Page">
      {/* No Navbar since it’s only on Home per your request */}
      <main className="news-content" role="main">
        <header className="news-header">
          <h1>Latest News</h1>
          <p>Stay updated with the latest announcements, promotions, and trends from Prime Boutique.</p>
        </header>

        <section className="news-articles">
          {newsArticles.map((article) => (
            <div key={article.id} className="news-card">
              <h2>{article.title}</h2>
              <p className="news-date">{article.date}</p>
              <p>{article.excerpt}</p>
              <Link to={article.link} className="read-more-link" aria-label={`Read more about ${article.title}`}>
                Read More
              </Link>
            </div>
          ))}
        </section>

        <section className="news-faq" aria-label="Frequently Asked Questions about News and Updates">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>How often are news updates posted?</h3>
            <p>We post news updates weekly, featuring promotions, product launches, and company announcements.</p>
          </div>
          <div className="faq-item">
            <h3>Can I subscribe to receive news via email?</h3>
            <p>Yes, sign up for our newsletter on the contact page to receive the latest news directly in your inbox.</p>
          </div>
          <div className="faq-item">
            <h3>Are news articles available in multiple languages?</h3>
            <p>Currently, all news is in English, but we’re working on multilingual support for future updates.</p>
          </div>
        </section>

        <Link to="/" className="back-home-btn" aria-label="Return to Prime Boutique Home Page">
          Back to Home
        </Link>
      </main>
    </div>
  );
};

export default News;