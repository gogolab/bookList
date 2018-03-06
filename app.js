// book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// ui constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;

    list.appendChild(row);
};

UI.prototype.clearFormFields = function() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
};

UI.prototype.showAlert = function(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    setTimeout(function() {
        document.querySelector(".alert").remove();
    }, 3000);
};

UI.prototype.deleteBook = function(target) {
    if (target.className === "delete") {
        target.parentElement.parentElement.remove();
    }
};

// event listener for submit
document.getElementById("book-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    const book = new Book(title, author, isbn);
    const ui = new UI();

    if (title === "" || author === "" || isbn === "") {
        ui.showAlert("Please fill in all form fields", "error");
    } else {
        ui.addBookToList(book);
        ui.showAlert("Book successfuly added to list", "success");
        ui.clearFormFields();
    }
});

// event listener for delete button
document.getElementById("book-list").addEventListener("click", function(e) {
    const ui = new UI();

    ui.deleteBook(e.target);
    ui.showAlert("Book removed from list", "success");

    e.preventDefault();
});
