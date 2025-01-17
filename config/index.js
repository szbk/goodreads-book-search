require("dotenv").config();

const config = {
  goodreadsBaseUrl: "https://www.goodreads.com/search?q=",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.105 Safari/537.36",
  },
  // Goodreads'e istek atarken, iki istek arasındaki zaman farkıdır
  fetchTimeout: 2000,
};

module.exports = config;
