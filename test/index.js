const { expect } = require("chai");
const AmazonBookSearch = require("../index");

describe("📦 Amazon Book Search (Turkish) Integration Test", () => {
  let bookSearch;
  const isbn = "9944824453";
  const geminiApiKey = process.env.GEMINI_API_KEY || "";
  const timeoutDuration = 30000;

  beforeEach(() => {
    bookSearch = new AmazonBookSearch("tr");
  });

  it('Is the ISBN "9944824453" 🔥', function (done) {
    this.timeout(timeoutDuration);
    bookSearch
      .getBookDetails(isbn)
      .then((bookDetails) => {
        expect(bookDetails).to.have.property("isbn");
        expect(bookDetails.isbn).to.equal("9944824453");
        done();
      })
      .catch(done);
  });

  it('Is the book title "Dövmeli Adam: İblis Döngüsü 1" 🚀', function (done) {
    this.timeout(timeoutDuration);
    bookSearch
      .getBookDetails(isbn)
      .then((bookDetails) => {
        expect(bookDetails).to.have.property("title");
        expect(bookDetails.title).to.equal("Dövmeli Adam: İblis Döngüsü 1");
        done();
      })
      .catch(done);
  });

  it("Checks if the book thumb image is not empty 🌄", function (done) {
    this.timeout(timeoutDuration);
    bookSearch
      .getBookDetails(isbn)
      .then((bookDetails) => {
        expect(bookDetails).to.have.property("thumbImage");
        expect(bookDetails.thumbImage).to.be.a("string");
        done();
      })
      .catch(done);
  });

  it('Is the book\'s publication date "1 Temmuz 2016" ⏰', function (done) {
    this.timeout(timeoutDuration);
    bookSearch
      .getBookDetails(isbn)
      .then((bookDetails) => {
        expect(bookDetails).to.have.property("date");
        expect(bookDetails.date).to.equal("1 Temmuz 2016");
        done();
      })
      .catch(done);
  });

  it('Is the page count "638" 📋', function (done) {
    this.timeout(timeoutDuration);
    bookSearch
      .getBookDetails(isbn)
      .then((bookDetails) => {
        expect(bookDetails).to.have.property("page");
        expect(bookDetails.page).to.equal(638);
        done();
      })
      .catch(done);
  });

  it('Is the publisher "Epsilon Yayınları" 📖', function (done) {
    this.timeout(timeoutDuration);
    bookSearch
      .getBookDetails(isbn)
      .then((bookDetails) => {
        expect(bookDetails).to.have.property("publisher");
        expect(bookDetails.publisher).to.equal("Epsilon Yayınları");
        done();
      })
      .catch(done);
  });

  it("Is the Gemini API test working for the book description 🤖", function (done) {
    this.timeout(timeoutDuration);
    bookSearch
      .getBookDetails(isbn, geminiApiKey)
      .then((bookDetails) => {
        expect(bookDetails).to.have.property("description");
        expect(bookDetails.description).to.be.a("string");
        done();
      })
      .catch(done);
  });

  it("Checks if raw description from Amazon is available 📄", function (done) {
    this.timeout(timeoutDuration);
    bookSearch
      .getBookDetails(isbn)
      .then((bookDetails) => {
        expect(bookDetails).to.have.property("descriptionRaw");
        expect(bookDetails.descriptionRaw).to.be.a("string");
        expect(bookDetails.descriptionRaw.length).to.be.greaterThan(0);
        done();
      })
      .catch(done);
  });

  it("Compares raw description with Gemini description 🔍", function (done) {
    this.timeout(timeoutDuration);
    bookSearch
      .getBookDetails(isbn, geminiApiKey)
      .then((bookDetails) => {
        expect(bookDetails).to.have.property("description");
        expect(bookDetails).to.have.property("descriptionRaw");

        // Both descriptions should be available
        expect(bookDetails.description).to.be.a("string");
        expect(bookDetails.descriptionRaw).to.be.a("string");

        // They should have different content when Gemini is used
        expect(bookDetails.description).to.not.equal(bookDetails.descriptionRaw);

        // Both should have reasonable length
        expect(bookDetails.description.length).to.be.greaterThan(100);
        expect(bookDetails.descriptionRaw.length).to.be.greaterThan(100);

        done();
      })
      .catch(done);
  });
});

describe("📦 Amazon Book Search (English) Integration Test", () => {
  let bookSearch;
  const isbn = "0593724283";
  const timeoutDuration = 30000;

  before(function (done) {
    this.timeout(timeoutDuration + 30000);
    setTimeout(done, 30000);
  });

  beforeEach(() => {
    bookSearch = new AmazonBookSearch("en");
  });

  it('Is the ISBN "0593724283" 🔥', function (done) {
    this.timeout(timeoutDuration);
    bookSearch
      .getBookDetails(isbn)
      .then((bookDetails) => {
        expect(bookDetails).to.have.property("isbn");
        expect(bookDetails.isbn).to.equal("0593724283");
        done();
      })
      .catch(done);
  });

  it('Is the book title "The Desert Spear: Book Two of The Demon Cycle" 🚀', function (done) {
    this.timeout(timeoutDuration);
    bookSearch
      .getBookDetails(isbn)
      .then((bookDetails) => {
        expect(bookDetails).to.have.property("title");
        expect(bookDetails.title).to.equal(
          "The Desert Spear: Book Two of The Demon Cycle"
        );
        done();
      })
      .catch(done);
  });

  it("Checks if the book thumb image is not empty 🌄", function (done) {
    this.timeout(timeoutDuration);
    bookSearch
      .getBookDetails(isbn)
      .then((bookDetails) => {
        expect(bookDetails).to.have.property("thumbImage");
        expect(bookDetails.thumbImage).to.be.a("string");
        done();
      })
      .catch(done);
  });

  it('Is the book\'s publication date "November 7, 2023" ⏰', function (done) {
    this.timeout(timeoutDuration);
    bookSearch
      .getBookDetails(isbn)
      .then((bookDetails) => {
        expect(bookDetails).to.have.property("date");
        expect(bookDetails.date).to.equal("November 7, 2023");
        done();
      })
      .catch(done);
  });

  it('Is the page count "864" 📋', function (done) {
    this.timeout(timeoutDuration);
    bookSearch
      .getBookDetails(isbn)
      .then((bookDetails) => {
        expect(bookDetails).to.have.property("page");
        expect(bookDetails.page).to.equal(864);
        done();
      })
      .catch(done);
  });

  it('Is the publisher "Del Rey" 📖', function (done) {
    this.timeout(timeoutDuration);
    bookSearch
      .getBookDetails(isbn)
      .then((bookDetails) => {
        expect(bookDetails).to.have.property("publisher");
        expect(bookDetails.publisher).to.equal("Del Rey");
        done();
      })
      .catch(done);
  });
});