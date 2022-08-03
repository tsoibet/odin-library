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

function displayBookInfo(book, index) {
    const deleteButton = document.createElement("div");
    deleteButton.id = index;
    deleteButton.textContent = "X";
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener("click", deleteBook);
    const title = document.createElement("div");
    title.textContent = book.title
    title.classList.add('title');
    const author = document.createElement("div");
    author.textContent = "by " + book.author;
    author.classList.add('author');
    const pages = document.createElement("div");
    pages.textContent = book.pages + " pages";
    pages.classList.add('pages');
    const status = document.createElement("div");
    if (book.isRead) {
        status.textContent = "Finished";
    } else {
        status.textContent = "Yet to finish";
    }
    status.classList.add('status');

    const card = document.createElement("div");
    card.appendChild(deleteButton);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(status);
    card.classList.add('card');

    const cards = document.querySelector("#library");
    cards.appendChild(card);
}

function displayLibrary() { 
    const library = document.querySelector("#library");
    library.textContent = "";
    myLibrary.forEach(displayBookInfo);
}

function deleteBook(event) {
    myLibrary.splice(event.target.id, 1);
    displayLibrary();
}

function showForm() {
    if (formShown) {
        return;
    }

    const addNewBookForm = document.createElement("form");
    addNewBookForm.name = "addNewBookForm";
    addNewBookForm.setAttribute("onsubmit", "return addBookToLibrary()");

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.textContent = "Title";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.id = "title";
    titleInput.required = true;

    const formRow1 = document.createElement("div");
    formRow1.classList.add("form-row");
    formRow1.appendChild(titleLabel);
    formRow1.appendChild(titleInput);
    addNewBookForm.appendChild(formRow1);

    const authorLabel = document.createElement("label");
    authorLabel.setAttribute("for", "author");
    authorLabel.textContent = "Author";

    const authorInput = document.createElement("input");
    authorInput.type = "text";
    authorInput.name = "author";
    authorInput.id = "author";
    authorInput.required = true;

    const formRow2 = document.createElement("div");
    formRow2.classList.add("form-row");
    formRow2.appendChild(authorLabel);
    formRow2.appendChild(authorInput);
    addNewBookForm.appendChild(formRow2);

    const pagesLabel = document.createElement("label");
    pagesLabel.setAttribute("for", "pages");
    pagesLabel.textContent = "Number Of Pages";

    const pagesInput = document.createElement("input");
    pagesInput.type = "number";
    pagesInput.name = "pages";
    pagesInput.id = "pages";
    pagesInput.required = true;

    const formRow3 = document.createElement("div");
    formRow3.classList.add("form-row");
    formRow3.appendChild(pagesLabel);
    formRow3.appendChild(pagesInput);
    addNewBookForm.appendChild(formRow3);

    const status = document.createElement("div");
    status.textContent = "Have you finished the book?";

    const yesLabel = document.createElement("label");
    yesLabel.setAttribute("for", "yes");
    yesLabel.textContent = "Yes";
    const yesInput = document.createElement("input");
    yesInput.type = "radio";
    yesInput.id = "isReadYes";
    yesInput.name = "isRead";
    yesInput.value = "true";
    yesInput.required = true;

    const noLabel = document.createElement("label");
    noLabel.setAttribute("for", "no");
    noLabel.textContent = "No";
    const noInput = document.createElement("input");
    noInput.type = "radio";
    noInput.id = "isReadNo";
    noInput.name = "isRead";
    noInput.value = "false";
    noInput.required = true;

    const formRow4 = document.createElement("div");
    formRow4.classList.add("form-row");
    formRow4.appendChild(status);
    formRow4.appendChild(yesLabel);
    formRow4.appendChild(yesInput);
    formRow4.appendChild(noLabel);
    formRow4.appendChild(noInput);
    addNewBookForm.appendChild(formRow4);

    const submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Add Book";
    
    const formRow5 = document.createElement("div");
    formRow5.classList.add("form-row");
    formRow5.appendChild(submitButton);
    addNewBookForm.appendChild(formRow5);

    const form = document.querySelector("#form");
    form.appendChild(addNewBookForm);

    formShown = true;
}

function clearForm() {
    const form = document.querySelector("#form");
    form.textContent = "";
    formShown = false;
}

function addBookToLibrary() { 
    let titleInput = document.forms["addNewBookForm"]["title"].value;
    let authorInput = document.forms["addNewBookForm"]["author"].value;
    let pagesInput = document.forms["addNewBookForm"]["pages"].value;
    let isReadInput = document.forms["addNewBookForm"]["isRead"].value;
    let newBook = new Book(titleInput, authorInput, pagesInput, isReadInput);
    myLibrary.push(newBook);
    clearForm();
    displayLibrary();
    return false;
}

let newBook1 = new Book("Test1","A1",25,true);
myLibrary.push(newBook1);
let newBook2 = new Book("Test2","A2",15,true);
myLibrary.push(newBook2);
let newBook3 = new Book("Test3","A3",115,false);
myLibrary.push(newBook3);

displayLibrary();

let formShown = false;
const showFormBtn = document.querySelector("#showFormBtn");
showFormBtn.addEventListener("click", showForm);

// Add a button on each book’s display to change its read status.
// To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.