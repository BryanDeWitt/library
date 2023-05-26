class Book {
  constructor(title, author, pages, readed) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readed = readed === "si" ? true : false;
  }
  readedOrNot() {
    this.readed = !this.readed;
  }
}

const books = [];
const addBtn = document.querySelector("#btn");
const form = document.querySelector("#form");
const blured = document.querySelector(".blur");
const submit = document.querySelector("input[type=submit]");

let book1 = new Book("Peepo el Clown", "Bryan", 55, "si");
let book2 = new Book("Peepo el Clown y la lucha contra el racismo de las ranas", "Bryan", 150, "no");
books.push(book1, book2);
render();

submit.addEventListener("click", (e) => {
  let title = document.querySelector("#title");
  let author = document.querySelector("#author");
  let pages = document.querySelector("#pages");
  if (title.checkValidity() && author.checkValidity() && pages.checkValidity()) {
    e.preventDefault();
    addBook();
    form.classList.toggle("show");
    form.classList.toggle("hidden");
    blured.classList.toggle("blured");
  }
});

addBtn.addEventListener("click", () => {
  form.classList.toggle("show");
  form.classList.toggle("hidden");
  blured.classList.toggle("blured");
  let deleteBtn = document.querySelectorAll(".delete-button");
  deleteBtn.forEach((btn) => {
    btn.disabled = true;
  });
});

function readedOrNot(index) {
  books[index].readedOrNot();
  render();
}

function removeBook(index) {
  books.splice(index, 1);
  render();
}

function render() {
  const list = document.querySelector("ul");
  list.innerHTML = "";
  for (let i = 0; i < books.length; i++) {
    let newBook = books[i];
    let bookContent = document.createElement("div");
    bookContent.innerHTML = createBookContent(i, newBook.title, newBook.author, newBook.pages, newBook.readed);
    list.appendChild(bookContent);
  }
}

function addBook() {
  let title = document.querySelector("#title");
  let author = document.querySelector("#author");
  let pages = document.querySelector("#pages");
  let read = document.querySelector("#readed");
  let newBook = new Book(title.value, author.value, pages.value, read.value);
  books.push(newBook);
  render();
  title.value = "";
  author.value = "";
  pages.value = "";
}

function createBookContent(index, title, author, pages, readed) {
  return `
      <li><div class="delete">
      <h2>Book ${[index + 1]}<h2><button class="delete-button" onclick='removeBook(${index})' >Delete</button>
      </div></li>
      <li>Title: ${title}</li>
      <li>Author: ${author}</li>
      <li>Pages: ${pages}</li>
      <li><div class="readed">
        Readed: ${readed === true ? "Si" : "No"} <input type="checkbox" ${readed === true ? "checked" : ""} class="check" onclick="readedOrNot(${index})">
      </div></li>`;
}
