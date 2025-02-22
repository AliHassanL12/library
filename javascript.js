
const myLibrary = [];
let counter = 0;

class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = 'Not read';
        this.id = counter++;
    }

    info() {
        return `Title: ${this.title}\nAuthor: ${this.author}\nNumber of Pages: ${this.pages}\n${this.read}`
    }

    changeRead() {
        this.read = (this.read === 'Not read') ? 'Read' : 'Not read'; 
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBookLibrary();
}

function displayBookLibrary() {
    clearBooks();
    displayBooks();
    addRemoveBooksListeners();
    addChangeReadStatusListeners();
}

function clearBooks() {
    document.querySelectorAll('.card').forEach(el => el.remove());
}

function addRemoveBooksListeners() {
    const removeBook = document.querySelectorAll('.removeBook');
    removeBook.forEach((button) => {
        button.addEventListener('click', () => {
            const parentElement = button.parentElement.parentElement;
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

function  addChangeReadStatusListeners() {
    const buttons = document.querySelectorAll('.changeRead');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const parentElement = button.parentElement.parentElement;
            for(let book of myLibrary) {
                if (book.id === +parentElement.getAttribute('id')) {
                    book.changeRead();
                    displayBookLibrary();
                }
            }
        })
    })
}

function displayBooks() {
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        const removeBook = document.createElement('button');
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttonContainer');
        const changeReadStatus = document.createElement('button');
        changeReadStatus.textContent = 'Change Read Status';
        changeReadStatus.classList.add('changeRead');
        removeBook.textContent = 'Remove';
        removeBook.classList.add('removeBook');
        bookCard.setAttribute('id',`${book.id}`)
        const container = document.querySelector('.container');
        bookCard.classList.add('card');
        bookCard.textContent = book.info();
        buttonContainer.appendChild(removeBook);
        buttonContainer.appendChild(changeReadStatus);
        bookCard.appendChild(buttonContainer);
        container.appendChild(bookCard);
    })
}

addBookToLibrary('Hippity', 'K', '300', 'Not read');
addBookToLibrary('Hoppity', 'K', '400', 'Not read');
addBookToLibrary('The Lord of the Rings', 'J.R.R Tolkien', '1200', 'Not read')

const openDialog = document.querySelector('.openDialog');
const dialog = document.querySelector('dialog');
openDialog.addEventListener('click', () => {
    dialog.showModal();
})
const cancelBtn = document.querySelector('.cancelBtn')
cancelBtn.addEventListener('click', () => {
    dialog.close();
})
const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formToObject = (form) => Object.fromEntries(new FormData(form));
    const book = formToObject(form);
    addBookToLibrary(book.title, book.author, book.pages, 'Not read');
    dialog.close();
})

