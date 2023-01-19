const siteUrl = "https://wwww.megskill.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/secret" },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap-0.xml`,
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/server-sitemap`,
      `${siteUrl}/server-sitemap/education`,
    ],
  },
  exclude: ["*/secret"],
};
