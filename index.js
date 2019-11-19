const form = document.querySelector('form')
const ul = document.querySelector('ul')
const button = document.querySelector('button')
const author = document.getElementById('author')
const year = document.getElementById('year')
const pages = document.getElementById('pages')
const bookName = document.getElementById('bookName')
const submit = document.getElementById('submit');


const liNode = ul.getElementsByTagName('LI');


const showTitle = () => {
    if (!localStorage.length) {
        document.getElementById('itemsNot').style.display = 'block';
        document.getElementById('items').style.display = 'none';
    } else {
        document.getElementById('itemsNot').style.display = 'none';
        document.getElementById('items').style.display = 'block';
    }
}

const startWork = ()=>{
    for (var i = 0; i < localStorage.length; ++i) {

        let currentTask = JSON.parse(localStorage.getItem(localStorage.key(i)));

        const node = document.createElement("LI");

        node.setAttribute('idBook', localStorage.key(i))
        
        let author = document.createElement('SPAN');
        let year = document.createElement('SPAN');
        let pages = document.createElement('SPAN');
        let bookName = document.createElement('SPAN')

        let deleteBtn = document.createElement('BUTTON');
        let editBtn = document.createElement('BUTTON');

        author.textContent = currentTask[0];
        year.textContent = currentTask[1];
        pages.textContent = currentTask[2];
        bookName.textContent = currentTask[3];

        deleteBtn.textContent = 'DELETE';
        editBtn.textContent = 'EDIT';

        node.append(author, year, pages, bookName, editBtn, deleteBtn)
        ul.appendChild(node)
    }
    showTitle()
}
startWork();

makeListItem = (authorInput, yearInput, pagesInput, bookNameInput) =>{

    const node = document.createElement("LI");
    let author = document.createElement('SPAN');
    let year = document.createElement('SPAN');
    let pages = document.createElement('SPAN');
    let bookName = document.createElement('SPAN')

    let idPreviousBook;
    if (ul.lastElementChild) {
        idPreviousBook = ul.lastElementChild.getAttribute('idBook');
        ++idPreviousBook;
    } else {
        idPreviousBook = 1;
    }
    
    node.setAttribute('idBook', idPreviousBook)
    let ranId = Math.floor(Math.random() * 999);
;

    let deleteBtn = document.createElement('BUTTON');
    let editBtn = document.createElement('BUTTON');

    author.textContent = authorInput;
    year.textContent = yearInput;
    pages.textContent = pagesInput;
    bookName.textContent = bookNameInput;
    
    deleteBtn.textContent = 'DELETE';
    editBtn.textContent = 'EDIT';

    deleteBtn.addEventListener('click',()=>deleteItem(node))
    editBtn.addEventListener('click', () => editItem(node))

    node.append(author, year, pages, bookName, editBtn, deleteBtn)
    ul.appendChild(node)
    
}

const deleteItem = (element) =>{
    let deletedItem = element.getAttribute('idBook');
    localStorage.removeItem(deletedItem)
    element.closest("li").remove()
    showTitle()
}

const editingProcess = (element) => {
    let keyValue = [[author.value], [year.value], [pages.value], [bookName.value]];

    localStorage.setItem(element.getAttribute('idBook'), JSON.stringify(keyValue));

    element.childNodes[0].textContent = author.value;
    element.childNodes[1].textContent = year.value;
    element.childNodes[2].textContent = pages.value;
    element.childNodes[3].textContent = bookName.value;

    const editOkBtn = document.querySelector('.editOkBtn')
    editOkBtn.remove()

    const allInputs = document.getElementsByTagName('INPUT');
    for (let i = 0; i < allInputs.length; i++) allInputs[i].value = '';

    
    submit.style.backgroundColor = '#0366EE';
    submit.style.pointerEvents = 'auto';

    element.lastElementChild.style.backgroundColor = '#0366EE';
    element.lastElementChild.style.pointerEvents = 'auto';
    element.lastElementChild.previousElementSibling.style.backgroundColor = '#0366EE';
    element.lastElementChild.previousElementSibling.style.pointerEvents = 'auto';

    ul.childNodes.forEach(el => {
        if (el != element) {
            el.style.backgroundColor = '#ffcc00';
            el.style.pointerEvents = 'auto';
        }
    });
    
}

const editItem = (element) =>{
    
    
    let elementforArg = element;
    author.value = element.childNodes[0].textContent;
    year.value = element.childNodes[1].textContent;
    pages.value = element.childNodes[2].textContent;
    bookName.value = element.childNodes[3].textContent;
    const editOkBtn = document.createElement('BUTTON');
    editOkBtn.textContent = 'OK';
    form.append(editOkBtn)
    editOkBtn.classList.add('editOkBtn')
    editOkBtn.addEventListener('click', () => editingProcess(elementforArg))

    
    submit.style.backgroundColor = 'gray';
    submit.style.pointerEvents = 'none';
   
    elementforArg.lastElementChild.style.backgroundColor = 'gray';
    elementforArg.lastElementChild.style.pointerEvents = 'none';
    elementforArg.lastElementChild.previousElementSibling.style.backgroundColor = 'gray';
    elementforArg.lastElementChild.previousElementSibling.style.pointerEvents = 'none';


    ul.childNodes.forEach(el => {
        if (el != elementforArg) {
            el.style.backgroundColor = 'gray';
            el.style.pointerEvents = 'none';
        }
        
    });
    
    
    
}

form.addEventListener('submit', function(event){
    event.preventDefault()
    makeListItem(author.value, year.value, pages.value, bookName.value)
    let arrTasks = [];
    
    arrTasks.push([author.value],[year.value], [pages.value], [bookName.value])
    
    let idPreviousBook;

    if (ul.lastElementChild) {
        idPreviousBook = ul.lastElementChild.getAttribute('idBook');
        idPreviousBook;
    } else {
        idPreviousBook = 1;
    }

    localStorage.setItem(idPreviousBook, JSON.stringify(arrTasks))
    
    const allInputs = document.getElementsByTagName('INPUT');
    for (let i = 0; i < allInputs.length; i++) allInputs[i].value = '';
    showTitle();
})

for (let i = 0; i < liNode.length; i++) {
    const element = liNode[i];
    let editBtn = element.lastElementChild.previousElementSibling;
    let deleteBtn = element.lastElementChild;
    deleteBtn.addEventListener('click', () => deleteItem(element));
    editBtn.addEventListener('click', ()=>editItem(element))
}


