const { extractBookId, extractBookDetails } = require("./module");
const config = require("../config");
const axios = require("axios");

class AmazonBookSearch {
  constructor(location) {
    if (location !== "tr" && location !== "en") {
      throw new Error("Invalid location! Must be 'tr' or 'en'");
    }

    this.url = location === "tr" ? config.tr_base_url : config.en_base_url;

    const fetchBookId = async (isbn) => {
      const headers = config.headers;

      try {
        const url = encodeURI(this.url + isbn);
        const response = await axios.get(url, { headers });
        if (!response.data) {
          throw new Error("Kitap bilgisi bulunamadı!");
        }

        const bookId = extractBookId(response.data);

        return bookId;
      } catch (error) {
        throw new Error(error.message);
      }
    };

    this.getBookDetails = async (isbn, geminiApiKey) => {
      // Input validation
      if (!isbn || typeof isbn !== 'string') {
        throw new Error("ISBN is required and must be a string");
      }

      // Clean ISBN (remove hyphens and spaces) and validate format
      const cleanIsbn = isbn.replace(/[-\s]/g, '');
      if (!/^\d{10}(\d{3})?$/.test(cleanIsbn)) {
        throw new Error("Invalid ISBN format. Must be 10 or 13 digits");
      }

      const headers = config.headers;
      try {
        const bookId = await fetchBookId(cleanIsbn);
        const url = encodeURI(
          location === "tr"
            ? config.tr_detail_url + bookId
            : config.en_detail_url + bookId
        );

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, config.fetchTimeout));

        const response = await axios.get(url, { headers });

        if (!response.data) {
          throw new Error("Book details not found!");
        }
        const details = await extractBookDetails(
          response.data,
          cleanIsbn,
          geminiApiKey,
          location
        );
        return details;
      } catch (error) {
        throw new Error(error.message);
      }
    };
  }
}

module.exports = AmazonBookSearch;

// Example usage:
// const AmazonBookSearch = require('./index.js');
//
// const bookSearch = new AmazonBookSearch("tr");
// const bookDetails = await bookSearch.getBookDetails("9944824453", process.env.GEMINI_API_KEY);
// console.log(bookDetails);
