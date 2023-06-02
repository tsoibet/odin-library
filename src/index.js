import './styles.css';
import { getFirebaseConfig } from './firebase-config.js';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';

const firebaseAppConfig = getFirebaseConfig();
const app = initializeApp(firebaseAppConfig);
const db = getFirestore(app);

class Book {

    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    displayBookInfo(book, index) {
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
        const statusNo = document.createElement("div");
        statusNo.textContent = "Yet to finish";
        const statusYes = document.createElement("div");
        statusYes.textContent = "Finished";
        if (book.isRead) {
            statusYes.classList.add('applied');
            statusNo.textContent = "";
        } else {
            statusNo.classList.add('applied');
            statusYes.textContent = "";
        }
        const status = document.createElement("div");
        status.appendChild(statusNo);
        status.appendChild(statusYes);
        status.classList.add('status');
        status.bookId = index;
        status.addEventListener("click", changeReadStatus);
    
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

}

async function displayLibrary() { 
    const library = document.querySelector("#library");
    library.textContent = "";
    const books = await getDocs(collection(db, "books"));
    books.forEach((obj) => {
        let title = obj.data().title;
        let author = obj.data().author;
        let pages = obj.data().pages;
        let isRead = obj.data().isRead;
        let book = new Book(title, author, pages, isRead);
        book.displayBookInfo(book, obj.id);
    });
}

async function deleteBook(event) {
    const bookRef = doc(db, "books", event.target.id);
    await deleteDoc(bookRef);
    displayLibrary();
}

async function changeReadStatus(event) {
    const bookRef = doc(db, "books", event.target.parentNode.bookId);
    const book = await getDoc(bookRef);
    if (book.data().isRead === true) {
        await updateDoc(bookRef, {
            isRead: false
        });
    }
    else {
        await updateDoc(bookRef, {
            isRead: true
        });
    }
    displayLibrary();
}

function showForm() {
    if (formShown) {
        return;
    }

    const addNewBookForm = document.createElement("form");
    addNewBookForm.name = "addNewBookForm";
    addNewBookForm.onsubmit = () => {
        addBookToLibrary();
        return false;
    };
    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.textContent = "Title";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.id = "title";
    titleInput.required = true;
    titleInput.addEventListener("input", () => {
        if (titleInput.validity.valueMissing) {
            titleInput.setCustomValidity("Book title is missing!");
            titleInput.reportValidity();
        } else {
            titleInput.setCustomValidity("");
        }
    });

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
    authorInput.addEventListener("input", () => {
        if (authorInput.validity.valueMissing) {
            authorInput.setCustomValidity("Who is the author?");
            authorInput.reportValidity();
        } else {
            authorInput.setCustomValidity("");
        }
    });

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
    pagesInput.addEventListener("input", () => {
        if (pagesInput.validity.valueMissing) {
            pagesInput.setCustomValidity("Don't forget to fill in the number of pages!");
            pagesInput.reportValidity();
        } else {
            pagesInput.setCustomValidity("");
        }
    });

    const formRow3 = document.createElement("div");
    formRow3.classList.add("form-row");
    formRow3.appendChild(pagesLabel);
    formRow3.appendChild(pagesInput);
    addNewBookForm.appendChild(formRow3);

    const status = document.createElement("div");
    status.textContent = "Have you finished the book?";

    const yesLabel = document.createElement("label");
    yesLabel.setAttribute("for", "isReadYes");
    yesLabel.textContent = "Yes";
    const yesInput = document.createElement("input");
    yesInput.type = "radio";
    yesInput.id = "isReadYes";
    yesInput.name = "isRead";
    yesInput.value = "true";
    yesInput.required = true;

    const noLabel = document.createElement("label");
    noLabel.setAttribute("for", "isReadNo");
    noLabel.textContent = "No";
    const noInput = document.createElement("input");
    noInput.type = "radio";
    noInput.id = "isReadNo";
    noInput.name = "isRead";
    noInput.value = "false";
    noInput.required = true;

    const statusInput = document.createElement("div");
    statusInput.appendChild(yesLabel);
    statusInput.appendChild(yesInput);
    statusInput.appendChild(noLabel);
    statusInput.appendChild(noInput);

    const formRow4 = document.createElement("div");
    formRow4.classList.add("form-row");
    formRow4.appendChild(status);
    formRow4.appendChild(statusInput);
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

async function addBookToLibrary() { 
    let titleInput = document.forms["addNewBookForm"]["title"].value;
    let authorInput = document.forms["addNewBookForm"]["author"].value;
    let pagesInput = document.forms["addNewBookForm"]["pages"].value;
    let isReadInput = (document.forms["addNewBookForm"]["isRead"].value === "true");
    try {
        await addDoc(collection(db, 'books'), 
        {
            title: titleInput,
            author: authorInput,
            pages: Number(pagesInput),
            isRead: isReadInput
        });
    }
    catch(error) {
        console.error('Error writing new book to Firebase Database', error);
    }
    clearForm();
    displayLibrary();
}

// Example books
// let newBook1 = new Book("Harry Potter", "J.K. Rowling", 1234, false);
// myLibrary.push(newBook1);
// let newBook2 = new Book("The Lord of the Rings", "J.R.R. Tolkien", 1357, true);
// myLibrary.push(newBook2);
// let newBook3 = new Book("A dog's life", "Nora", 18, false);
// myLibrary.push(newBook3);
// let newBook4 = new Book("Project: Library", "Betsy", 227, true);
// myLibrary.push(newBook4);

displayLibrary();

let formShown = false;
const showFormBtn = document.querySelector("#showFormBtn");
showFormBtn.addEventListener("click", showForm);

