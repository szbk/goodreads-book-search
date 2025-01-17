# Unoffical Goodreads Book Search API

Bu kütüphane, herhangi bir API anahtarına ihtiyaç duymadan sadece ISBN numarası kullanarak Goodreads'ten kitap bilgilerini almayı sağlar. Kütüphane, Goodreads'in HTML yapısını analiz eder ve kitap detaylarını JSON formatında döndürür. Asenkron (Promise tabanlı) çalışır.
## ✨ Özellikler

- 📚 ISBN numarası kullanarak Goodreads'ten kitap bilgisi getirir.
- 🖼️ Kitap kapağı, başlık, yazar, tür ve yayın tarihi gibi detaylı bilgileri döndürür.
- 🕒 İki istek arasında özelleştirilebilir bir bekleme süresi.
- ✅ Testler Mocha ve Chai ile entegre edilmiştir.
- 🌐 Axios ve Cheerio kullanılarak web verisi çekilir ve ayrıştırılır.

## 🎯 Gereksinimler

- Node.js (v14 veya üzeri)
- NPM
- Internet Bağlantısı
- Merak

## 📦 Kurulum

```bash
npm install wisecolt-goodreads-search-api
```
## 🚀 Kullanım

Aşağıdaki örnek, API'yi nasıl kullanacağınızı gösterir:

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


// Örnek Çıktı:
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

## 📂 Proje Yapısı
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

## 🧪 Testler
Testleri çalıştırmak için aşağıdaki adımları izleyin:
1. Test bağımlılıklarını yükleyin:
    ```javascript
    npm install
    ```
2. Testleri çalıştırın:
      ```javascript
    npm test
    ```  