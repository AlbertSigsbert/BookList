class Book {
    constructor(author, title, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
   //Add Book  Method
   addBook(book){
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

   //Delete book method
   deleteBook(target) {
        if(target.className === 'text-danger')
        {
        target.parentElement.parentElement.remove();
        }
   }
  
   //Alert method
  addAlert(message, classname) {
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

 //Create clearFields method
   clearFields(){
    document.getElementById('title').value ='';
    document.getElementById('author').value ='';
    document.getElementById('isbn').value ='';
  
  }
  
}

class Store {
    static getBook(){
       let books;

       if(localStorage.getItem('books') === null){
           books = [];
       }else{
           books = JSON.parse(localStorage.getItem('books'))
       }
       
       return books;
    }

    static addBook(book){
        const books = Store.getBook();

        books.push(book);

        localStorage.setItem('books' , JSON.stringify(books));

    }

    static displayBook(){
      const books = Store.getBook();
      const ui = new UI;

      books.forEach(book => {
        ui.addBook(book);
      });
      
    }

    static removeBook(isbn){
        const books = Store.getBook();
        
        books.forEach((book,index) => {
         if(book.isbn === isbn){
            books.splice(index,1);
         }
        });

        localStorage.setItem('books' , JSON.stringify(books));
        
    }
}
//Display books on DOM load
document.addEventListener('DOMLoadContent', Store.displayBook());

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

     // Add Book to LS
     Store.addBook(book);
      
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

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

   //Alert Success
   ui.addAlert('Book Removed Succesfully!', 'alert-success');

  e.preventDefault();
});