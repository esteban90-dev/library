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

while(isAdd) {
  addBookToLibrary();
  userInput = prompt('Would you like to add another book to the library? Enter yes/no');
  if(userInput === "no") {
    isAdd = false;
  }
}


