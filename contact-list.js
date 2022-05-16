var addModel = document.getElementById("ContactModel");
var searchModel = document.getElementById("filterInput");
var contacts = document.getElementById("contacts");



 

document.getElementById("openAddModel").addEventListener('click', openAddModel);

document.getElementById("addContact").addEventListener('click', addContact);
  
contacts.addEventListener('click', deleteContact);

searchModel.addEventListener('keyup', filterContact);

searchModel.addEventListener('keydown', filterContact);

//When click on add button, will open interface to add contact and close the search section


 
function openAddModel(e){
    addModel.style.display = "block";
    searchModel.style.display = "none";
     
   
}


 // Add contact into list when we press button add Contact

function addContact(e){
     e.preventDefault();
     
    
     

    var getName = document.getElementById("addName") ;
    var getNumber = document.getElementById("addcontactno.") ;
    var getEmail = document.getElementById("addEmail");

// If the user didn't fill even a single option it will show alert

    if(getName.value == "" || getNumber.value == '' || getEmail.value == ""){
       // if user click on ok it will again call the function 
        if(confirm("Fill up all columns in Contact Section")){
            addModel.style.display = "block"
            addContact();
        }else{
            addModel.style.display = "none"
        }
         
        // add contact to our list
    }else{

    
    var contact = document.createElement("li");
    contact.className="list-group-item mt-2 mb-1 contactInList";
    
    var liName = document.createElement("h2");
    liName.appendChild(document.createTextNode(getName.value));
    contact.appendChild(liName);

    var liNumber = document.createElement("h6");
    liNumber.appendChild(document.createTextNode(getNumber.value));
    contact.appendChild(liNumber);

    var liEmail = document.createElement("h6");
    liEmail.appendChild(document.createTextNode(getEmail.value));
    contact.appendChild(liEmail);
    
    var deleteButton = document.createElement("button");
     
    deleteButton.className= "btn btn-default btn-danger deleteButton btn-block";
    deleteButton.appendChild(document.createTextNode("Delete Contact"));
    contact.appendChild(deleteButton);
    
    contacts.appendChild(contact);
    addModel.style.display = "none"

    localStorage.setItem('contactListLocal', JSON.stringify(contacts));

    
}
// after adding it will make sure that all the input columns are empty again


    getName.value  = "";
    getNumber.value  = "";
    getEmail.value = "";    
    // and search section again appear
    searchModel.style.display = "block";
    
}
 


function deleteContact(e){
    e.preventDefault();
     
    if(e.target.classList.contains('deleteButton')){
    if(confirm("Are you sure")){
      var contactspecific =   e.target.parentElement;
      contacts.removeChild(contactspecific);
      
    }

    
}

}

function filterContact(e){
    var filterValue = e.target.value.toLowerCase();
     var contactList = contacts.getElementsByTagName('li');

     Array.from(contactList).forEach(function(contacti){
         var contactName = contacti.firstChild.textContent;
         if(contactName.toLowerCase().indexOf(filterValue) != -1){
             contacti.style.display = "block";
         }else{
             contacti.style.display = "none";
         }
     })
     
}

 
