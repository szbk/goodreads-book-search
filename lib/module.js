const { GoogleGenerativeAI } = require("@google/generative-ai");
const cheerio = require("cheerio");

const geminiDescriptionEdit = async (description, geminiApiKey, location) => {
  if (geminiApiKey != undefined) {
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    let prompt;
    if (location == "en") {
      prompt =
        description +
        " based on the text above, provide a detailed book description of similar length. Do not add any comments to the text, remain completely faithful to it. Only provide the book description, without using a title like book description.";        
    } else {
      prompt =
        description +
        " yukarıdaki metine bağlı kalarak, benzer uzunlukta bir kitap tanımı ver. Metine hiçbir yorum katma, metine tamamen sadık kal. Sadece kitap tanımını ver, Kitap Tanımı şeklinde bir başlık kullanma";
    }
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } else {
    return description;
  }
};

const extractBookId = (html) => {
  const $ = cheerio.load(html);
  let bookId = null;

  $("[data-csa-c-item-id]").each((index, element) => {
    const itemId = $(element).attr("data-csa-c-item-id");
    if (!itemId.startsWith("amzn1.asin.1.B")) {
      bookId = itemId
        .replace(/^amzn1\.asin(\.amzn1)?\./, "")
        .replace(/^1\./, "");
      return false; // Exit loop after finding the first valid bookId
    }
  });

  return bookId;
};
const extractBookPage = ($) => {
  const text = $("div.rpi-attribute-value span").text(); // İçeriği al
  const numberMatch = text.match(/\d+/); // Yalnızca rakamları al
  return numberMatch ? parseInt(numberMatch[0], 10) : null; // Sayıyı döndür
};

const extractBookPublisher = ($) => {
  const publisherParentDiv = $(".rpi-icon.book_details-publisher").parent();
  const publisherDiv = publisherParentDiv.next();
  const spanInsidePublisherSibling = publisherDiv.find("span");
  return spanInsidePublisherSibling.text();
};

const extractBookDate = ($) => {
  const dateParentDiv = $(".rpi-icon.book_details-publication_date").parent();
  const dateDiv = dateParentDiv.next();
  const spanInsideDateSibling = dateDiv.find("span");
  return spanInsideDateSibling.text();
};

const sanitizeIsbnValue = (value) =>
  value ? value.replace(/[^\dXx]/g, "").replace(/x/g, "X") : null;

const extractBookIsbn = ($, preferredLength) => {
  const selectors = [
    "#rpi-attribute-book_details-isbn13 .rpi-attribute-value span",
    "#rpi-attribute-book_details-isbn10 .rpi-attribute-value span",
    '#detailBullets_feature_div li span:contains("ISBN-13")',
    '#detailBullets_feature_div li span:contains("ISBN-10")',
    'tr:contains("ISBN-13") td',
    'tr:contains("ISBN-10") td'
  ];

  let isbn10 = null;
  let isbn13 = null;

  for (const selector of selectors) {
    const text = $(selector).last().text().trim();
    const isbn = sanitizeIsbnValue(text);
    if (isbn && (isbn.length === 10 || isbn.length === 13)) {
      if (preferredLength && isbn.length === preferredLength) {
        return isbn;
      }
      if (isbn.length === 10 && !isbn10) {
        isbn10 = isbn;
      } else if (isbn.length === 13 && !isbn13) {
        isbn13 = isbn;
      }
    }
  }

  if (preferredLength === 10) {
    return isbn10 || isbn13;
  }
  if (preferredLength === 13) {
    return isbn13 || isbn10;
  }
  return isbn10 || isbn13;
};

const extractBookDetails = async (html, isbn, geminiApiKey, location) => {
  const extractedText = html
    .match(
      /<div\s[^>]*class="a-expander-content a-expander-partial-collapse-content"[^>]*>(.*?)<\/div>/s
    )?.[1]
    ?.replace(/<[^>]+>/g, "")
    .trim();

  // Sonucu yazdır
  const $ = cheerio.load(html);
  const title = $("#imgTagWrapperId img").attr("alt");
  const thumbImage = $("#imgTagWrapperId img").attr("src");
  const authorName = $(".author a").text();

  const descriptionRaw = $("#bookDescription_feature_div .a-expander-content")
    .text()
    .trim();

  const description = await geminiDescriptionEdit(
    descriptionRaw,
    geminiApiKey,
    location
  );
  const page = extractBookPage($);
  const publisher = extractBookPublisher($);
  const date = extractBookDate($);
  const ratingText = $('i[data-hook="average-star-rating"] .a-icon-alt').text();
  const ratingMatch = ratingText.match(/[\d.,]+/);
  const rate = ratingMatch ? ratingMatch[0].replace(",", ".") : null;
  const resolvedIsbn = extractBookIsbn($, isbn.length) || isbn;

  return {
    title,
    thumbImage,
    authorName,
    description,
    descriptionRaw, // Amazon'dan gelen ham açıklama
    page,
    publisher,
    isbn: resolvedIsbn,
    date,
    rate
  };
};

module.exports = { extractBookId, extractBookDetails };
