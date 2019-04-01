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
    const StoredBooks = [
      {
        title: 'Lion King',
        author: 'flexi',
        isbn: '12345'
      },
      {
        title: 'Brave Heart',
        author: 'gibson',
        isbn: '54321'
      },
      {
        title: 'Quasimodore',
        author: 'fracois',
        isbn: '32415'
      }
    ];

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

  // static clearFields() {
  //   document.querySelector('#title').value = '';
  //   document.querySelector('#author').value = '';
  //   document.querySelector('#isbn').value = '';
  // }
}

//store class: handles storage

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
    alert('Please Input Field Values');
  } else {
    //Instantiate Book
    const book = new Book(title, author, isbn);
    // Add Book to UI
    UI.addBookLIst(book);
  }
});

//CLEAR FORM AFTER SUBMISSION
// UI.clearFields();

function submitForm() {
  document.contactform.submit();
  document.contactform.reset();
}

//Event to Remove a Book
document.querySelector('#booklist').addEventListener('click', e => {
  UI.deleteBook(e.target);
});
