let libraryArr = [];
let addBookButton = document.querySelector("#addBook");

function Book(title, author, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
}

function refreshLibraryDisplay() {
  let bookContainer = document.querySelector("#bookContainer");

  //remove all books in library
  while(bookContainer.firstChild){
    bookContainer.removeChild(bookContainer.firstChild);
  }

  //add all books in library
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

document.querySelector('form').addEventListener("submit", addBookToLibrary);

function addBookToLibrary(event){
  var data = new FormData(event.target);
  var bookInfo = data.getAll("book");
  var title = bookInfo[0];
  var author = bookInfo[1];
  var length = parseInt(bookInfo[2]);
  var hasRead = (bookInfo[3] === "true");
 
  let book = new Book(title,author,length,hasRead);
  libraryArr.push(book);
  refreshLibraryDisplay();

  event.preventDefault()
}

document.querySelector("#newBook").addEventListener("click",() => {
  if(document.querySelector("form").classList.contains("display-none")) {
    document.querySelector("form").classList.remove("display-none");
    document.querySelector("form").classList.add("display-flex");
  } else {
    document.querySelector("form").classList.remove("display-flex");
    document.querySelector("form").classList.add("display-none");
  }
})








