const { expect } = require("chai");

const GoodreadsBookSearch = require("../index");

describe("🧠 Goodreads Book Search Integration Test:", () => {

    let bookSearch;
    const isbn = "9944824453";
    const timeoutDuration = 10000;

    beforeEach(() => {
        bookSearch = new GoodreadsBookSearch();
    });

    it('Kitap başlığı "Dövmeli Adam" mı? 🚀', function (done) {

        this.timeout(timeoutDuration)
        bookSearch.getBookDetails(isbn)
            .then((bookDetails) => {
                expect(bookDetails).to.have.property("title");
                expect(bookDetails.title).to.equal("Dövmeli Adam");
                done();
            })
            .catch(done);
    });

    it('Yazar adı "Peter V. Brett" mi? 💡', function (done) {

        this.timeout(timeoutDuration);
        bookSearch.getBookDetails(isbn)
            .then((bookDetails) => {
                expect(bookDetails).to.have.property("authorName");
                expect(bookDetails.authorName.author.name).to.equal("Peter V. Brett");
                done();
            })
            .catch(done);
    });

    it('Sayfa sayısı "640" mı? 📋', function (done) {

        this.timeout(timeoutDuration);
        bookSearch.getBookDetails(isbn)
            .then((bookDetails) => {
                expect(bookDetails).to.have.property("page");
                expect(bookDetails.page).to.equal("640");
                done();
            })
            .catch(done);
    });

    it('Kitap basım tarihi "1 September 2008" mi? ⏰', function (done) {
        this.timeout(timeoutDuration);

        bookSearch.getBookDetails(isbn)
            .then((bookDetails) => {
                expect(bookDetails).to.have.property("date");
                expect(bookDetails.date).to.equal("01 Sept 2008");
                done();
            })
            .catch(done);
    });

    it('ISBN "9944824453" mi? 🔥', function (done) {

        this.timeout(timeoutDuration);
        bookSearch.getBookDetails(isbn)
            .then((bookDetails) => {
                expect(bookDetails).to.have.property("isbn");
                expect(bookDetails.isbn).to.equal("9944824453");
                done();
            })
            .catch(done);
    });
});