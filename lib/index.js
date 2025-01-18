const modules = require("./module");
const config = require("../config");
const axios = require("axios");

class GoodreadsBookSearch {

  getBookDetails = async (isbn) => {
    const headers = config.headers;
    const url = encodeURI(config.goodreadsBaseUrl + isbn);
    try {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const response = await axios.get(url, { headers });
            if (!response.data) {
              throw new Error("Detay bilgisi bulunamadı!");
            }
            const details = await modules.extractBookDetails(
              response.data,
              isbn,
            );
            resolve(details);
          } catch (error) {
            reject(error);
          }
        }, config.fetchTimeout);
      });
    } catch (error) {
      throw new Error("Hata: " + error.message);
    }
  };

}

module.exports = GoodreadsBookSearch;

// (async () => {
//   try {
//     const BookSearch = new GoodreadsBookSearch();
//     const bookDetails = await BookSearch.getBookDetails("6059141005");
//     // console.log(bookDetails);
//   } catch (error) {
//     console.log(error.message);
//   }
// })();
