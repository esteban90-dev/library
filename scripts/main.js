let libraryArr = [];
let isAdd = true;

function Book(title, author, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  let title = prompt("Enter a book title");
  let author = prompt("Enter the book's author");
  let numPages = prompt("How many pages is the book?");

  let userInput = prompt("Have you read the book?  Enter yes/no");
  let isRead;
  if (userInput === "yes") {
    isRead = true;
  } else {
    isRead = false;
  }

  let newBook = new Book(title, author, numPages, isRead);
  libraryArr.push(newBook);
}

function displayLibrary() {
  let bookContainer = document.querySelector("#bookContainer");
  for(let i=0; i<libraryArr.length; i++) {
    let book = createBookCard(libraryArr[i]);
    bookContainer.appendChild(book);
  }
}

function createBookCard(book) {
  card = document.createElement("div");
  card.classList.add("col-3", "border-radius-3", "bg-gray-200", "p-3", "m-3", "width-5");
  bookTitle = document.createElement("p");
  bookTitle.textContent = "title: " + book.title;
  bookAuthor = document.createElement("p");
  bookAuthor.textContent = "author: " + book.author;
  bookPages = document.createElement("p");
  bookPages.textContent = "length: " + book.numPages + " pages";
  bookIsRead = document.createElement("p");
  if (book.isRead) {
    bookIsRead.textContent = "read: yes";
  } else {
    bookIsRead.textContent = "read: no";
  }
  card.appendChild(bookTitle);
  card.appendChild(bookAuthor);
  card.appendChild(bookPages);
  card.appendChild(bookIsRead);
  return card;
}

while(isAdd) {
  addBookToLibrary();
  userInput = prompt('Would you like to add another book to the library? Enter yes/no');
  if(userInput === "no") {
    isAdd = false;
  }
}
displayLibrary();





