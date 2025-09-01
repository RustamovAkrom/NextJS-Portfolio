/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://akrom-omega.vercel.app', // твой URL
  generateRobotsTxt: true, // создаст robots.txt автоматически
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  // exclude: ['/secret-page'], // если есть страницы, которые не хочешь включать
};
