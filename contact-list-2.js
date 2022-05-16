// Open add contact column->
var addModel = document.getElementById("ContactModel");
var contacts = document.getElementById("contacts");
var searchModel = document.getElementById("filterInput");

document.getElementById("openAddModel").addEventListener('click', openAddModel);
document.getElementById("addContact").addEventListener('click', addContact);
contacts.addEventListener('click', deleteContact);
searchModel.addEventListener('keyup', filterContact);
 
// Open add contact column->



function openAddModel(e1){
    e1.preventDefault();
     addModel.style.display = "block"; ;
     searchModel.style.display = "none";
}

class ContactConst{
    constructor(name, contact, emailId){
        this.name = name;
        this.contact = contact;
        this.emailId = emailId;
    }
}

class Storage {
    static getContact(){
        let contacts;
        if(localStorage.getItem("contacts") === null){
            contacts = [];
        }else{
            contacts = JSON.parse(localStorage.getItem('contacts'));
        }
        return contacts;
    
    }

    static storeContact(contact){
        const contacts = Storage.getContact();
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    static removeContact(email){
        const contacts = Storage.getContact();
        contacts.forEach((contact, index) => {
            if(contact.emailId === email){
                contacts.splice(index, 1);
            }
        });
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
}

//filter =>
function filterContact(e){
    var filtervalue = e.target.value.toLowerCase();
    var contactList = contacts.getElementsByTagName('li');

    Array.from(contactList).forEach(contact => {
        var contactName = contact.firstChild.textContent;
        if(contactName.toLowerCase().indexOf(filtervalue) != -1){
            contact.style.display = 'block';
        }else{
            contact.style.display = 'none';
        }
    })

}




//Validate=>
function addContact(e){
    e.preventDefault();
     
    
    var getName = document.getElementById("addName").value ;
    var getNumber = document.getElementById("addcontactno").value ;
    var getEmail = document.getElementById("addEmail").value;

    if(getName === '' || getNumber === '' || getEmail === ''){
        if(confirm("Fill up all columns in Contact Section")){
            addModel.style.display = "block"
            addContact();
        }else{
            addModel.style.display = "none"
        }
    }else{ 
    
    const contactDetail1 = new ContactConst(getName, getNumber, getEmail)

    //display contacts->
    UI.showContactToList(contactDetail1);

      //clear space=>
    UI.clearSpace();

//Store to local Storage ->
    Storage.storeContact(contactDetail1)

    }
    searchModel.style.display = "block";
} 
function deleteContact(e){
    e.preventDefault();
    if(e.target.classList.contains('deleteButton')){
        if(confirm('Are you sure')){
            var contactspecific =   e.target.parentElement;
            contacts.removeChild(contactspecific);

            Storage.removeContact(e.target.previousElementSibling.textContent);
        }
    }
}

     
 


//display the contact =>
class UI{
    static importLS(){
        const contacts = Storage.getContact();
    
        contacts.forEach((contact) => UI.showContactToList(contact));
    }
    static showContactToList(contactDetail2){

         
    
    const contactBlock = document.createElement('li');
    contactBlock.className="list-group-item mt-2 mb-1 contactInList";

     var liName = document.createElement("h2");
    liName.appendChild(document.createTextNode(contactDetail2.name));
    contactBlock.appendChild(liName);

    var liNumber = document.createElement("h6");
    liNumber.appendChild(document.createTextNode(contactDetail2.contact));
    contactBlock.appendChild(liNumber);

    var liEmail = document.createElement("h6");
    liEmail.appendChild(document.createTextNode(contactDetail2.emailId));
    contactBlock.appendChild(liEmail);
    
    var deleteButton = document.createElement("button");
     
    deleteButton.className= "btn btn-default btn-danger deleteButton btn-block";
    deleteButton.appendChild(document.createTextNode("Delete Contact"));
    contactBlock.appendChild(deleteButton);
    
    contacts.appendChild(contactBlock);
    addModel.style.display = "none"


    }

    static clearSpace(){
        document.querySelector('#addName').value='';
        document.querySelector('#addcontactno').value='';
        document.querySelector('#addEmail').value='';

    }
}
document.addEventListener('DOMContentLoaded', UI.importLS());
 








  



