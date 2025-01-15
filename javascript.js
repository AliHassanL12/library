
const myLibrary = [];
let counter = 0;
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = counter++;
}

Book.prototype.info = function() {
    return `${this.title}\nBy ${this.author}\n${this.pages} pages\n${this.read}`
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBookLibrary();
}

function displayBookLibrary() {
    clearLibrary();
    createBookDOM();
    removeBook();
}

function clearLibrary() {
    document.querySelectorAll('.card').forEach(el => el.remove());
}

addBookToLibrary('Hippity', 'K', '300', 'Not read yet');
addBookToLibrary('Hoppity', 'K', '400', 'Not read yet');
addBookToLibrary('The Lord of the Rings', 'J.R.R Tolkien', '1200', 'Not read yet')

const openDialog = document.querySelector('.openDialog');
const dialog = document.querySelector('dialog');
openDialog.addEventListener('click', () => {
    dialog.showModal();
})

const addBookBtn = document.querySelector('.addBookBtn');
const form = document.querySelector('#form');
addBookBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const formToObject = (form) => Object.fromEntries(new FormData(form));
    const book = formToObject(form);
    addBookToLibrary(book.title, book.author, book.pages, book.read);
    dialog.close();
})

function removeBook() {
    const removeBook = document.querySelectorAll('.removeBook');
    removeBook.forEach((button) => {
        button.addEventListener('click', () => {
            const parentElement = button.parentElement;
            for(let book of myLibrary) {
                if (book.id === +parentElement.getAttribute('id')) {
                    const bookIndex = myLibrary.indexOf(book);
                    myLibrary.splice(bookIndex, 1);  
                    displayBookLibrary();
                }
            }
        });
    })
}

function createBookDOM() {
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        const removeBook = document.createElement('button');
        removeBook.textContent = 'Remove';
        removeBook.classList.add('removeBook');
        bookCard.setAttribute('id',`${book.id}`)
        const container = document.querySelector('.container');
        bookCard.classList.add('card');
        bookCard.textContent = book.info();
        bookCard.appendChild(removeBook);
        container.appendChild(bookCard);
    })
}