var libraryArr = [];

retrieveLibrary();

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

  bookIsReadLabel = document.createElement("label");
  bookIsReadLabel.textContent = "Read:";

  bookIsReadCheckBox = document.createElement("input");
  bookIsReadCheckBox.setAttribute("type","checkbox");
  bookIsReadCheckBox.setAttribute("id",bookIndex);
  if (book.isRead) {
    bookIsReadCheckBox.checked = true;
  } else {
    bookIsReadCheckBox.checked = false;
  }
  bookIsReadCheckBox.addEventListener("change",changeReadStatus);

  bookRemoveButton = document.createElement("input");
  bookRemoveButton.setAttribute("type","button");
  bookRemoveButton.setAttribute("value", "remove");
  bookRemoveButton.setAttribute("id", bookIndex);
  bookRemoveButton.addEventListener("click", (event) => {
    removeBookFromLibrary(parseInt(event.target.getAttribute("id")));
  });

  readStatusDiv = document.createElement("div");
  readStatusDiv.appendChild(bookIsReadLabel);
  readStatusDiv.appendChild(bookIsReadCheckBox);

  removeDiv = document.createElement("div");
  removeDiv.classList.add("mt-4","display-flex","justify-center");
  removeDiv.appendChild(bookRemoveButton);

  card.appendChild(bookTitle);
  card.appendChild(bookAuthor);
  card.appendChild(bookPages);
  card.appendChild(readStatusDiv);
  card.appendChild(removeDiv);
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
  storeLibrary();
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
  storeLibrary();
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
  storeLibrary();
  refreshLibraryDisplay();
}

//test for localStorage - from MDN
function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

function storeLibrary(){
  if (storageAvailable('localStorage')) {
    window.localStorage.setItem('libraryArr', JSON.stringify(libraryArr));
  }
}

function retrieveLibrary(){
  if (storageAvailable('localStorage')) {
    let temp = JSON.parse(window.localStorage.getItem('libraryArr'));
    if (temp) {
      for(let i=0;i<temp.length;i++){
        //replace prototype lost when converting objects to JSON
        Object.setPrototypeOf(temp[i],Book.prototype);
      }
      libraryArr = temp;
      refreshLibraryDisplay();
    }
    else {
      libraryArr = [];
    }
  }
}













