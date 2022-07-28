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

function displayBookInfo(book) {
    console.log(book.info());
    const para = document.createElement("p");
    const node = document.createTextNode(book.title + " by " + book.author + ". " + book.pages + " pages. " + book.isRead);
    para.appendChild(node);
    const element = document.getElementById("library");
    element.appendChild(para);
}

function displayLibrary() { 
    myLibrary.forEach(displayBookInfo);
}

function addBookToLibrary() { 
    let titleInput = document.forms["addNewBookForm"]["title"].value;
    let authorInput = document.forms["addNewBookForm"]["author"].value;
    let pagesInput = document.forms["addNewBookForm"]["pages"].value;
    let isReadInput = document.forms["addNewBookForm"]["isRead"].value;
    let newBook = new Book(titleInput, authorInput, pagesInput, isReadInput);
    myLibrary.push(newBook);
    return false;
}


let newBook1 = new Book("Test1","A1",25,true);
myLibrary.push(newBook1);
let newBook2 = new Book("Test2","A2",15,true);
myLibrary.push(newBook2);

displayLibrary();


// Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book: author, title, number of pages, whether it’s been read and anything else you might want.

// Add a button on each book’s display to remove the book from the library.
// You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.

// Add a button on each book’s display to change its read status.
// To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.