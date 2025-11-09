# Unofficial Amazon Book Search

A powerful Node.js library that retrieves comprehensive book information from Amazon using ISBN numbers without requiring an Amazon API key. This library intelligently parses Amazon's HTML structure to extract book details and returns them in a clean JSON format. Built with asynchronous operations for optimal performance.

Additionally, integrate Google's Gemini AI to enhance or regenerate book descriptions, providing richer and more engaging content for your applications.

## ✨ Features

- 📚 **ISBN-based Search**: Retrieve book information from Amazon using ISBN numbers only
- 🌍 **Multi-regional Support**: Works with both Amazon.com (English) and Amazon.com.tr (Turkish)
- 🖼️ **Rich Metadata**: Extract comprehensive details including:
  - Book cover images (thumbnail URLs)
  - Title and author information
  - Page count and publication date
  - Publisher information
  - Customer ratings
  - Original and AI-enhanced descriptions
- 🤖 **AI-Powered Descriptions**: Optional integration with Google Gemini AI to generate enhanced book descriptions
- ⚡ **Asynchronous Operations**: Promise-based API for non-blocking operations
- 🕒 **Rate Limiting**: Built-in configurable delay between requests to avoid Amazon rate limiting
- ✅ **Comprehensive Testing**: Full test suite using Mocha and Chai
- 🔧 **Flexible Configuration**: Customizable headers, timeouts, and request parameters
- 🌐 **Web Scraping**: Intelligent HTML parsing using Axios and Cheerio
- 📦 **Lightweight**: Minimal dependencies and easy integration

## 🎯 Requirements

- **Node.js**: Version 14.0 or higher
- **NPM**: Version 6.0 or higher (comes with Node.js)
- **Internet Connection**: Required to access Amazon websites
- **Google Gemini API Key**: Optional, for AI-enhanced book descriptions

## 📦 Installation

Install the package via npm:

```bash
npm install szbk-amazon-book-search
```

### Development Installation

For development or testing purposes:

```bash
git clone https://github.com/szbk/szbk-amazon-book-search.git
cd szbk-amazon-book-search
npm install
```

## 🚀 Usage

### Basic Usage

The following example demonstrates basic usage with ISBN search:

```javascript
const AmazonBookSearch = require("szbk-amazon-book-search");

(async () => {
  try {
    // Initialize for English Amazon
    const bookSearch = new AmazonBookSearch("en");

    // Get book details using ISBN
    const bookDetails = await bookSearch.getBookDetails("0593724283");

    console.log(bookDetails);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
```

### Usage with Gemini AI Integration

Enhance book descriptions using Google's Gemini AI:

```javascript
const AmazonBookSearch = require("szbk-amazon-book-search");

(async () => {
  try {
    const bookSearch = new AmazonBookSearch("en");

    // Include your Gemini API key for enhanced descriptions
    const bookDetails = await bookSearch.getBookDetails(
      "0593724283",
      "YOUR_GEMINI_API_KEY"
    );

    console.log(bookDetails);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
```

### Turkish Amazon Support

Search on Amazon Turkey:

```javascript
const AmazonBookSearch = require("szbk-amazon-book-search");

(async () => {
  try {
    // Initialize for Turkish Amazon
    const bookSearch = new AmazonBookSearch("tr");

    const bookDetails = await bookSearch.getBookDetails("9944824453");

    console.log(bookDetails);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
```

## 📋 API Reference

### Constructor

```javascript
new AmazonBookSearch(location)
```

**Parameters:**
- `location` (string): Amazon region to use.
  - `"en"` - Amazon.com (English)
  - `"tr"` - Amazon.com.tr (Turkish)

**Returns:** AmazonBookSearch instance

### Methods

#### `getBookDetails(isbn, geminiApiKey?)`

Retrieves detailed book information using the ISBN number.

**Parameters:**
- `isbn` (string): The ISBN number of the book (10 or 13 digits)
- `geminiApiKey` (string, optional): Google Gemini API key for enhanced descriptions

**Returns:** Promise resolving to book details object

## 📊 Response Format

The `getBookDetails` method returns an object with the following structure:

```json
{
  "title": "The Desert Spear: Book Two of The Demon Cycle",
  "thumbImage": "https://m.media-amazon.com/images/I/51VC3BV9KBL._SY445_SX342_.jpg",
  "authorName": "Peter V. Brett",
  "description": "Enhanced book description (if Gemini API key provided) or original description",
  "page": 864,
  "publisher": "Del Rey",
  "isbn": "0593724283",
  "date": "November 7, 2023",
  "rate": "4.5"
}
```

**Field Descriptions:**
- `title`: Book title
- `thumbImage`: URL to the book cover thumbnail image
- `authorName`: Author's full name
- `description`: Book description (original or AI-enhanced)
- `page`: Number of pages
- `publisher`: Publishing house name
- `isbn`: ISBN number used for search
- `date`: Publication date
- `rate`: Customer rating (format: "X.X")

## 📂 Project Structure

```
szbk-amazon-book-search/
├── config/
│   └── index.js              # Configuration settings (URLs, headers, timeouts)
├── lib/
│   ├── index.js              # Main AmazonBookSearch class
│   └── module.js             # Data processing, HTML parsing, and Gemini AI integration
├── test/
│   └── index.js              # Comprehensive integration tests (English & Turkish)
├── reports/                  # Test report output directory
├── .claude/                  # Claude configuration directory
├── .git/                     # Git repository metadata
├── index.js                  # Package entry point
├── package.json              # Dependencies and npm scripts
├── package-lock.json         # Dependency lock file
├── Jenkinsfile               # CI/CD pipeline configuration
├── mocha-report-config.json  # Test reporting configuration
├── .gitignore                # Git ignore patterns
├── .npmignore                # NPM ignore patterns
└── README.md                 # This documentation
```

### Key Components

- **`config/index.js`**: Amazon URLs, request headers, timeout settings
- **`lib/index.js`**: Core AmazonBookSearch class with search functionality
- **`lib/module.js`**: HTML parsing logic and Gemini AI integration
- **`test/index.js`**: Comprehensive test suite covering both regions and AI features

## 🧪 Testing

### Running Tests

The library includes a comprehensive test suite covering both Amazon regions and Gemini AI integration.

```bash
# Install dependencies
npm install

# Run all tests
npm test
```

### Test Coverage

The test suite includes:

- **Turkish Amazon Tests** (ISBN: 9944824453)
  - ISBN validation
  - Title extraction ("Dövmeli Adam: İblis Döngüsü 1")
  - Thumbnail image retrieval
  - Publication date parsing
  - Page count extraction
  - Publisher information
  - Gemini AI integration for Turkish descriptions

- **English Amazon Tests** (ISBN: 0593724283)
  - ISBN validation
  - Title extraction ("The Desert Spear: Book Two of The Demon Cycle")
  - Thumbnail image retrieval
  - Publication date parsing
  - Page count extraction
  - Publisher information

### Test Configuration

Tests are configured using:
- **Mocha**: Test framework
- **Chai**: Assertion library
- **Mocha Multi-Reporters**: Generates test reports in multiple formats
- **Timeout**: 30 seconds per test to accommodate network requests

### Test Reports

Test results are generated in the `reports/` directory with detailed XML reports for CI/CD integration.

## 🚀 CI/CD Integration

### Jenkins Pipeline

The project includes a pre-configured Jenkinsfile for automated testing and deployment:

**Pipeline Features:**
- **Scheduled Builds**: Runs every 6 hours
- **Node.js Environment**: Uses Node.js v22.13.0
- **Automated Testing**: Installs dependencies and runs test suite
- **Test Reporting**: Publishes test results as JUnit XML
- **Slack Integration**: Sends build notifications to #jenkins channel
- **Build Status Tracking**: Success/failure notifications with build URLs

**Pipeline Stages:**
1. Directory cleanup
2. Dependency installation
3. Test execution
4. Test result publishing
5. Slack notifications

## ⚙️ Configuration

### Default Configuration

The library uses predefined settings located in `config/index.js`:

```javascript
{
  en_base_url: "https://www.amazon.com/s?k=",
  en_detail_url: "https://www.amazon.com/dp/",
  tr_base_url: "https://www.amazon.com.tr/s?k=",
  tr_detail_url: "https://www.amazon.com.tr/dp/",
  headers: {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
  },
  fetchTimeout: 2000  // 2 seconds delay between requests
}
```

### Rate Limiting

The library includes built-in rate limiting with a 2-second delay between requests to prevent Amazon from blocking requests and to be respectful to their servers.

## 🤖 Gemini AI Integration

### Setup

To use the Gemini AI feature for enhanced book descriptions:

1. **Get API Key**: Obtain a Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **Add to Project**: Include the API key in your environment variables or pass it directly to the method

### Usage

```javascript
const AmazonBookSearch = require("szbk-amazon-book-search");

// Method 1: Pass API key directly
const bookDetails = await bookSearch.getBookDetails(isbn, "YOUR_GEMINI_API_KEY");

// Method 2: Use environment variable
require('dotenv').config();
const bookDetails = await bookSearch.getBookDetails(isbn, process.env.GEMINI_API_KEY);
```

### Description Enhancement

When Gemini AI is enabled:
- **Original Description**: Extracted from Amazon's product page
- **Enhanced Description**: Gemini analyzes the original and creates an improved, more engaging description
- **Language Support**: Supports both English and Turkish descriptions
- **Length Preservation**: Maintains similar length to original descriptions

## ⚠️ Important Considerations

### Rate Limiting & Best Practices

- **Built-in Delay**: 2-second delay between requests prevents rate limiting
- **Respectful Usage**: Don't make excessive requests in short time periods
- **Error Handling**: Always wrap requests in try-catch blocks
- **Network Issues**: Handle potential connection timeouts

### Legal & Ethical Usage

- **Educational Purposes**: This library is intended for educational and development use
- **Amazon Terms**: Be aware of Amazon's terms of service regarding web scraping
- **Commercial Use**: Obtain proper permissions before using in commercial applications
- **Data Usage**: Use extracted data responsibly and ethically

### Dependencies

The library uses the following key dependencies:

- **axios** (v1.6.8): HTTP client for making requests to Amazon
- **cheerio** (v1.0.0-rc.12): HTML parsing and DOM manipulation
- **@google/generative-ai** (v0.8.0): Google Gemini AI integration
- **dotenv** (v16.4.5): Environment variable management

### Development Dependencies

- **mocha** (v11.0.1): Test framework
- **chai** (v5.1.2): Assertion library
- **mocha-junit-reporter** (v2.2.1): JUnit XML test reports
- **mocha-multi-reporters** (v1.5.1): Multiple test report formats

## 🐛 Troubleshooting

### Common Issues

#### "Yanlış konum!" Error
**Solution**: Ensure you use valid location codes: `"en"` or `"tr"`

#### "Kitap bilgisi bulunamadı!" Error
**Causes**:
- Invalid ISBN number
- Book not found on Amazon
- Network connectivity issues
- Amazon blocking requests

**Solutions**:
- Verify ISBN is correct (10 or 13 digits)
- Check network connection
- Try again after some time (rate limiting)
- Ensure book exists on the target Amazon site

#### Timeouts
**Cause**: Slow network or Amazon response times
**Solution**: Increase timeout in configuration if needed

#### Gemini AI Not Working
**Solutions**:
- Verify API key is valid
- Check Gemini API quota
- Ensure internet connectivity
- Try without Gemini API key first

### Debug Mode

Enable detailed logging by adding console statements or using a debugger to trace request flows and identify issues.

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check existing issues for common problems
- Review the troubleshooting section above

## 🔗 Related Links

- [Amazon.com](https://www.amazon.com)
- [Amazon Turkey](https://www.amazon.com.tr)
- [Google Gemini AI](https://ai.google.dev/)
- [NPM Package](https://www.npmjs.com/package/szbk-amazon-book-search)

---

**Note**: This is an unofficial library and is not affiliated with or endorsed by Amazon or Google. Use responsibly and in accordance with the terms of service of the respective platforms.  