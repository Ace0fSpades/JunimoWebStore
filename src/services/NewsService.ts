import { News } from '../models/News';

// Mock data for news since we don't have a backend endpoint for it
const mockNews: News[] = [
  {
    id: 1,
    title: 'New Game Releases This Month',
    content: 'Check out these exciting new games hitting our store this month!',
    imageURL: 'assets/images/gameBlankImage.png',
    publishDate: new Date().toISOString(),
    author: 'Admin',
    category: 'Releases',
    tags: ['new games', 'releases']
  },
  {
    id: 2,
    title: 'Summer Sale Starting Soon',
    content: 'Get ready for our biggest summer sale yet! Discounts up to 80% on selected titles.',
    imageURL: 'assets/images/gameBlankImage.png',
    publishDate: new Date().toISOString(),
    author: 'Admin',
    category: 'Sales',
    tags: ['sale', 'discount', 'summer']
  },
  {
    id: 3,
    title: 'Upcoming Indie Games Showcase',
    content: 'Join us for a special showcase of the most anticipated indie games of the year.',
    imageURL: 'assets/images/gameBlankImage.png',
    publishDate: new Date().toISOString(),
    author: 'Admin',
    category: 'Events',
    tags: ['indie', 'showcase', 'events']
  },
  {
    id: 4,
    title: 'Top 10 RPGs You Should Play',
    content: 'Our editors have compiled a list of the best RPGs that every gamer should experience.',
    imageURL: 'assets/images/gameBlankImage.png',
    publishDate: new Date().toISOString(),
    author: 'GameEditor',
    category: 'Lists',
    tags: ['rpg', 'top10', 'recommendations']
  }
];

export const NewsService = {
  getAllNews: async () => {
    // Simulate API call
    return new Promise<News[]>((resolve) => {
      setTimeout(() => resolve(mockNews), 300);
    });
  },

  getNewsById: async (id: number) => {
    // Simulate API call
    return new Promise<News | undefined>((resolve) => {
      setTimeout(() => resolve(mockNews.find(news => news.id === id)), 300);
    });
  },

  getNewsByCategory: async (category: string) => {
    // Simulate API call
    return new Promise<News[]>((resolve) => {
      setTimeout(() => resolve(mockNews.filter(news => news.category === category)), 300);
    });
  }
}; 