//Create Book Constructor
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//Create a UI constructor
function UI(){}

//Create addBook prototype
UI.prototype.addBook  = function(book){
   
    //Creating a tr
    const row = document.createElement('tr');
    //Creating td
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a class="text-danger">X</a></td>
    `;
    //Append row to tbody
    document.getElementById('books').appendChild(row);

}

//Create clearFields prototype
UI.prototype.clearFields  = function(){
  document.getElementById('title').value ='';
  document.getElementById('author').value ='';
  document.getElementById('isbn').value ='';

}

//Add Submit EventListener
document.querySelector('.add-book').addEventListener('submit', function(e){
   
    //Get form values
     const title = document.getElementById('title').value,
           author = document.getElementById('author').value,
           isbn = document.getElementById('isbn').value;
    
    //Instantiate book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    //Add book
    ui.addBook(book);

    //Clear fields
    ui.clearFields();

  e.preventDefault();
});