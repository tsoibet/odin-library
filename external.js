let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function() {
    bookInfo = {
        Title: this.title,
        Author: this.author,
        Pages: this.pages,
        IsRead: this.isRead
    }
    return bookInfo
}

function addBookToLibrary(title, author, pages, isRead) { 
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

// Steps:

// loops through the array and displays each book on the page

// It might help for now to manually add a few books to your array so you can see the display.

// Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book: author, title, number of pages, whether it’s been read and anything else you might want.

// Add a button on each book’s display to remove the book from the library.
// You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.

// Add a button on each book’s display to change its read status.
// To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.