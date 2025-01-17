const { expect } = require("chai");

const GoodreadsBookSearch = require("../index");

describe("🧠 Goodreads Book Search Integration Test", () => {
    let bookSearch;
    const isbn = "9944824453";
    const timeoutDuration = 30000;

    beforeEach(() => {
        bookSearch = new GoodreadsBookSearch();
    });

    it('Is the ISBN "9944824453"? 🔥', function (done) {
        this.timeout(timeoutDuration);
        bookSearch.getBookDetails(isbn)
            .then((bookDetails) => {
                expect(bookDetails).to.have.property("isbn");
                expect(bookDetails.isbn).to.equal("9944824453");
                done();
            })
            .catch(done);
    });

    it('Is the book title "Dövmeli Adam"? 🚀', function (done) {
        this.timeout(timeoutDuration);
        bookSearch.getBookDetails(isbn)
            .then((bookDetails) => {
                expect(bookDetails).to.have.property("title");
                expect(bookDetails.title).to.equal("Dövmeli Adam");
                done();
            })
            .catch(done);
    });

    it('Is the book\'s publication date "1 September 2008"? ⏰', function (done) {
        this.timeout(timeoutDuration);
        bookSearch.getBookDetails(isbn)
            .then((bookDetails) => {
                expect(bookDetails).to.have.property("date");
                expect(bookDetails.date).to.equal("01 Sept 2008");
                done();
            })
            .catch(done);
    });

    it('Is the page count "640"? 📋', function (done) {
        this.timeout(timeoutDuration);
        bookSearch.getBookDetails(isbn)
            .then((bookDetails) => {
                expect(bookDetails).to.have.property("page");
                expect(bookDetails.page).to.equal("640");
                done();
            })
            .catch(done);
    });
});