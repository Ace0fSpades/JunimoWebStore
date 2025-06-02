import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/pages/NewsDetailsPage.module.scss';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaTag } from 'react-icons/fa';
import { NewsService } from '../services/NewsService';
import { News } from '../models/News';
import { createNewsPlaceholderImage } from '../utils/createPlaceholderImage';

const NewsDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        setLoading(true);
        if (!id) return;
        
        const newsData = await NewsService.getNewsById(parseInt(id));
        
        if (!newsData) {
          setError('Новость не найдена');
          return;
        }
        
        setNews(newsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching news details:', err);
        setError('Не удалось загрузить информацию о новости. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetails();
  }, [id]);

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!news) {
    return <div className="error-message">Новость не найдена</div>;
  }

  const formattedDate = new Date(news.publishDate).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const imageSource = imageError || !news.imageURL ? 
    createNewsPlaceholderImage(800, 450, news.title) : 
    news.imageURL;

  return (
    <div className={styles.newsDetailsPage}>
      <div className="container">
        <div className={styles.backNav}>
          <Link to="/news" className={styles.backLink}>
            <FaArrowLeft /> Назад к новостям
          </Link>
        </div>
        
        <article className={styles.newsArticle}>
          <div className={styles.newsHeader}>
            <h1>{news.title}</h1>
            
            <div className={styles.newsMeta}>
              <div className={styles.metaItem}>
                <FaCalendarAlt />
                <span>{formattedDate}</span>
              </div>
              
              <div className={styles.metaItem}>
                <FaUser />
                <span>{news.author}</span>
              </div>
              
              <div className={styles.metaItem}>
                <FaTag />
                <span>{news.category}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.newsImage}>
            <img 
              src={imageSource} 
              alt={news.title} 
              onError={handleImageError}
            />
          </div>
          
          <div className={styles.newsContent}>
            <p>{news.content}</p>
          </div>
          
          {news.tags && news.tags.length > 0 && (
            <div className={styles.newsTags}>
              <span className={styles.tagsLabel}>Теги:</span>
              <div className={styles.tagsList}>
                {news.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default NewsDetailsPage; 