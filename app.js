//Book Class Representing a Book

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//The UI Class

class UI {
  static dispalyBooks() {
    const StoredBooks = Store.getBooks();

    const books = StoredBooks;

    books.forEach(book => UI.addBookLIst(book));
  }

  static addBookLIst(book) {
    const list = document.querySelector('#booklist');

    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  // static showAlert(message, className) {
  //   const div = document.createElement('div');
  //   div.className = `alert alert-${className}`;
  //   div.appendChild(document.createTextNode(message));
  //   const container = document.querySelector('.container');
  //   const form = document.querySelector('#book-form');
  //   container.insertBefore(div, form);
  // }

  // static myFunction(message, className) {
  //   var div = document.createElement('div');
  //   div.className = `alert alert-${className}`;
  //   var textnode = document.createTextNode(message);
  //   node.appendChild(message);
  //   document.getElementById('book-form').appendChild(node);
  //   container.insertBefore(div, form);
  // }

  // static clearFields() {
  //   document.querySelector('#title').value = '';
  //   document.querySelector('#author').value = '';
  //   document.querySelector('#isbn').value = '';
  // }
}

//store class: handles storage

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//Event to Display Books

document.addEventListener('DOMContentLoaded', UI.dispalyBooks);

//Event to Add a Book

document.querySelector('#book-form').addEventListener('submit', e => {
  //Prevent Default
  e.preventDefault();

  //Get form values

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  //validation
  if (title === '' || author === '' || isbn === '') {
    UI.myFunction('Please Input Field Values', 'danger');
  } else {
    //Instantiate Book
    const book = new Book(title, author, isbn);
    // Add Book to UI
    UI.addBookLIst(book);

    //Add books to store
    Store.addBook(book);
  }
});

//CLEAR FORM AFTER SUBMISSION
// UI.clearFields();

function submitForm() {
  document.contactform.submit();
  // document.contactform.reset();
}

//Event to Remove a Book
document.querySelector('#booklist').addEventListener('click', e => {
  //Remove Book from UI
  UI.deleteBook(e.target);

  //Remove Book From Store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
