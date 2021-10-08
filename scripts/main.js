let libraryArr = [];
let addBookButton = document.querySelector("#addBook");

function Book(title, author, numPages, isRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
}

Book.prototype.toggleRead = function(){
  if (this.isRead){
    this.isRead = false;
  } else {
    this.isRead = true;
  }
}

function refreshLibraryDisplay() {
  let bookContainer = document.querySelector("#bookContainer");

  //remove all displayed books
  while(bookContainer.firstChild){
    bookContainer.removeChild(bookContainer.firstChild);
  }

  //display all books in library
  for(let i=0; i<libraryArr.length; i++) {
    let book = createBookCard(libraryArr[i], i);
    bookContainer.appendChild(book);
  }
}

function createBookCard(book, bookIndex) {
  card = document.createElement("div");
  card.classList.add("col-3", "border-radius-3", "bg-gray-200", "p-3", "m-3", "width-5");
  bookTitle = document.createElement("p");
  bookTitle.textContent = "title: " + book.title;
  bookAuthor = document.createElement("p");
  bookAuthor.textContent = "author: " + book.author;
  bookPages = document.createElement("p");
  bookPages.textContent = "length: " + book.numPages + " pages";
  bookIsRead = document.createElement("span");
  if (book.isRead) {
    bookIsRead.textContent = "read: yes";
  } else {
    bookIsRead.textContent = "read: no";
  }

  bookRemoveButton = document.createElement("input");
  bookRemoveButton.setAttribute("type","button");
  bookRemoveButton.setAttribute("value", "remove");
  bookRemoveButton.setAttribute("id", bookIndex);
  bookRemoveButton.addEventListener("click", (event) => {
    removeBookFromLibrary(parseInt(event.target.getAttribute("id")));
  });

  changeReadStatusButton = document.createElement("input");
  changeReadStatusButton.setAttribute("type", "button");
  changeReadStatusButton.setAttribute("id", bookIndex);
  changeReadStatusButton.setAttribute("value", "change");
  changeReadStatusButton.addEventListener("click", changeReadStatus);

  div = document.createElement("div");
  div.appendChild(bookIsRead);
  div.appendChild(changeReadStatusButton);

  card.appendChild(bookTitle);
  card.appendChild(bookAuthor);
  card.appendChild(bookPages);
  card.appendChild(div);
  card.appendChild(bookRemoveButton);
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

function removeBookFromLibrary(bookIndex){
  var temp = [];
  for(let i=0; i<libraryArr.length;i++){
    if (i !== bookIndex) {
      temp.push(libraryArr[i]);
    }
  }
  libraryArr = temp;
  refreshLibraryDisplay();
}

document.querySelector("#newBook").addEventListener("click",(event) => {
  if(event.target.getAttribute("value") === "+ new book"){
    event.target.setAttribute("value", "- new book");
  } else {
    event.target.setAttribute("value", "+ new book");
  }

  if(document.querySelector("form").classList.contains("display-none")) {
    document.querySelector("form").classList.remove("display-none");
    document.querySelector("form").classList.add("display-block");
  } else {
    document.querySelector("form").classList.remove("display-block");
    document.querySelector("form").classList.add("display-none");
  }
})

function changeReadStatus(event){
  book = libraryArr[(event.target.getAttribute("id"))];
  book.toggleRead();
  refreshLibraryDisplay();
}








