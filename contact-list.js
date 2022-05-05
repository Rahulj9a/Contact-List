var addModel = document.getElementById("ContactModel");
var searchModel = document.getElementById("filterInput");
var contacts = document.getElementById("contacts");
//var contactInList = document.getElementByClass('contactInList')


 

document.getElementById("openAddModel").addEventListener('click', openAddModel);

document.getElementById("addContact").addEventListener('click', addContact);
  
contacts.addEventListener('click', deleteContact);

searchModel.addEventListener('keyup', filterContact);

searchModel.addEventListener('keydown', filterContact);

//When click on add button, will open interface to add contact and close the search section

 
function openAddModel(e){
    addModel.style.display = "block";
    searchModel.style.display = "none";
    console.log('1');
   
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

    
    var li = document.createElement("li");
    li.className="list-group-item mt-2 mb-1 contactInList";
    
    var liName = document.createElement("h2");
    liName.appendChild(document.createTextNode(getName.value));
    li.appendChild(liName);

    var liNumber = document.createElement("h6");
    liNumber.appendChild(document.createTextNode(getNumber.value));
    li.appendChild(liNumber);

    var liEmail = document.createElement("h6");
    liEmail.appendChild(document.createTextNode(getEmail.value));
    li.appendChild(liEmail);
    
    var deleteButton = document.createElement("button");
     
    deleteButton.className= "btn btn-default btn-danger deleteButton btn-block";
    deleteButton.appendChild(document.createTextNode("Delete Contact"));
    li.appendChild(deleteButton);
    
    contacts.appendChild(li);
    addModel.style.display = "none"
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
      var contact =   e.target.parentElement;
      contacts.removeChild(contact);
    }
}

}

function filterContact(e){
    var filterValue = e.target.value.LowerCase;
     var contactList = contacts.getElementsByTagName('li');

     Array.from(contactList).forEach(function(contact){
         var contactName = contact.firstChild.textContent;
         if(contactName.toLowerCase().indexOf(filterValue) != -1){
             contact.style.display = "block";
         }else{
             contact.style.display = "none";
         }
     })
     
}