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

//Delete book prototype
UI.prototype.deleteBook = function (target) {
  if(target.className === 'text-danger')
  {
     target.parentElement.parentElement.remove();
  }
}

//Alert Prototype method
UI.prototype.addAlert = function (message, classname) {
   //Create a div
   const div = document.createElement('div');
   //Add classname
   div.className = `alert ${classname}`;
   //Add textnode
   div.innerText = message;
   //Grab container
   const container = document.querySelector('.container');
   //Grab form
   const form = document.querySelector('.add-book');
   //Insert alert btn container and form
   container.insertBefore(div, form);
   //Set Timeout
   setTimeout(function() {
     document.querySelector('.alert').remove();
   },3000);
}
//Create clearFields prototype
UI.prototype.clearFields  = function(){
  document.getElementById('title').value ='';
  document.getElementById('author').value ='';
  document.getElementById('isbn').value ='';

}

//Add Book EventListener
document.querySelector('.add-book').addEventListener('submit', function(e){
   
    //Get form values
     const title = document.getElementById('title').value,
           author = document.getElementById('author').value,
           isbn = document.getElementById('isbn').value;
    
    //Instantiate book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();
    
    //Add validation
    if (title === '' || author ==='' || isbn ==='') {
        ui.addAlert('Please fill in all the fields', 'alert-danger');
    } else {
       //Add book
    ui.addBook(book);
      
    //Alert Success
    ui.addAlert('Book Added Succesfully!', 'alert-success');

    //Clear fields
    ui.clearFields();
    }
           
  e.preventDefault();
});

//Remove Book Event Listener
document.querySelector('#books').addEventListener('click', function(e) {
  
  const ui = new UI();

  ui.deleteBook(e.target);

   //Alert Success
   ui.addAlert('Book Removed Succesfully!', 'alert-success');

  e.preventDefault();
});