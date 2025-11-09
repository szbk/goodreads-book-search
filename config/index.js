require("dotenv").config();

const config = {
  en_base_url: "https://www.amazon.com/s?k=",
  en_detail_url: "https://www.amazon.com/dp/",
  tr_base_url: "https://www.amazon.com.tr/s?k=",
  tr_detail_url: "https://www.amazon.com.tr/dp/",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
  },
  // Amazon'a istek atarken, iki istek arasındaki zaman farkıdır
  fetchTimeout: 2000,
};

module.exports = config;
