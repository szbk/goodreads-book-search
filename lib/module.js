const cheerio = require("cheerio");


const extractBookPage = ($) => {
  // "pagesFormat" test ID'sine sahip p etiketindeki sayıyı çıkar
  const pagesText = $('[data-testid="pagesFormat"]').text();

  // Metinden yalnızca rakamı almak için regex kullan
  const match = pagesText.match(/\d+/); // Sadece sayıları bulur

  return match ? match[0] : null; // Sayıyı döndür
};

const extractBookDate = ($) => {

  const publicationDateText = $('p[data-testid="publicationInfo"]').text().replace('First published ', '').trim();
  const publicationDate = new Date(publicationDateText);
  const formattedDate = publicationDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return formattedDate;
};

const extractAuthorAndTranslators = ($) => {
  // Yazar ve çevirmen isimlerini Set'lere ekle
  const authorsSet = new Set();
  const translatorsSet = new Set();
  const authorLink = $('a.ContributorLink').attr('href');

  $('.ContributorLink').each((index, element) => {
    const name = $(element).find('.ContributorLink__name').text().trim();
    const role = $(element).find('.ContributorLink__role').text().trim();

    if (role.toLowerCase().includes('translator')) {
      translatorsSet.add(name);  // Çevirmenleri ekle
    } else {
      authorsSet.add({ name, profileLink: authorLink });  // Yazarları ekle
    }
  });

  const authors = Array.from(authorsSet);
  const translators = Array.from(translatorsSet);

  const result = {};

  if (authors.length > 0) {
    result.author = authors[0]; // İlk yazar
  }

  if (translators.length > 0) {
    result.translators = translators; // Çevirmenlerin tamamı
  }

  return result;
}
function extractGenreList($) {

  const genres = [];
  $('span.BookPageMetadataSection__genreButton').each((index, element) => {
    const genre = $(element).find('.Button__labelItem').text().trim();
    genres.push(genre);
  });

  return genres;
}

const extractBookDetails = async (html, isbn, gemini_api_key) => {
  const $ = cheerio.load(html);
  const title = $('h1[data-testid="bookTitle"]').text(); // OK
  const thumbImage = $('meta[property="og:image"]').attr('content'); // OK
  const authorName = extractAuthorAndTranslators($); // OK
  const description = $('.BookPageMetadataSection__description .Formatted').text().trim(); //OK
  const page = extractBookPage($);
  const rate = $('.RatingStatistics__rating').first().text().trim();
  const date = extractBookDate($);
  const genres = extractGenreList($);

  return {
    title,
    thumbImage,
    authorName,
    description,
    page,
    isbn,
    date,
    rate,
    genres
  };
};

module.exports = { extractBookDetails };