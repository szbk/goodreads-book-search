# Unoffical Goodreads Book Search API

This library allows you to retrieve book information from Goodreads using only the ISBN number, without needing an API key. The library analyzes Goodreads' HTML structure and returns book details in JSON format. It works asynchronously (based on Promises).

## ✨ Features

- 📚 Retrieves book information from Goodreads using the ISBN number.
- 🖼️ Returns detailed information such as book cover, title, author, genre, and publication date.
- 🕒 Customizable delay between requests.
- ✅ Tests integrated with Mocha and Chai.
- 🌐 Web data is fetched and parsed using Axios and Cheerio.

## 🎯 Requirements

- Node.js (v14 veya üzeri)
- NPM
- Internet connection
- Curiosity

## 📦 Installation

```bash
npm install wisecolt-goodreads-search-api
```
## 🚀 Usage

The following example shows how to use the API:

```javascript
const GoodreadsBookSearch = require("wisecolt-goodreads-search-api");

(async () => {
  try {
    const BookSearch = new GoodreadsBookSearch();
    const bookDetails = await BookSearch.getBookDetails("9944824453");

    console.log(bookDetails);
  } catch (error) {
    console.error("Hata:", error.message);
  }
})();


// Example Output:
{
  title: 'Dövmeli Adam',
  thumbImage: 'https: //res.cloudinary.com/path/to/image.jpg',
  authorName: {
    author: { name: 'Peter V. Brett', profileLink: '/author/show/12345'
    },
    translators: ['Çevirmen Adı 1', 'Çevirmen Adı 2'
    ]
  },
  description: 'Kitap açıklaması burada yer alır.',
  page: '640',
  isbn: '9944824453',
  date: '01 Sept 2008',
  rate: '4.3',
  genres: ['Fantasy', 'Adventure', 'Action'
  ]
}
```

## 📂 Project Structure
```javascript
wisecolt-goodreads-search-api
├── config
│   └── index.js        # Konfigürasyon dosyası
├── lib
│   ├── index.js        # GoodreadsBookSearch sınıfı
│   └── module.js       # Veri işleme ve parse işlemleri
├── test
│   └── index.js        # Entegrasyon testleri
├── index.js            # Giriş noktası
├── package.json        # Bağımlılıklar ve betikler
└── README.md           # Dokümantasyon
```

## 🧪 Tests
To run the tests, follow these steps:
1. Install test dependencies:
    ```javascript
    npm install
    ```
2. Run the tests:
      ```javascript
    npm test
    ```  