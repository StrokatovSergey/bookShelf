const form = document.querySelector('form')
const ul = document.querySelector('ul')
const button = document.querySelector('button')
const author = document.getElementById('author')
const year = document.getElementById('year')
const pages = document.getElementById('pages')
const bookName = document.getElementById('bookName')
const liNode = ul.getElementsByTagName('LI');




const startWork = ()=>{
    for (var i = 0; i < localStorage.length; ++i) {

        let currentTask = JSON.parse(localStorage.getItem(localStorage.key(i)));

        const node = document.createElement("LI");
        // node.classList.add(localStorage.key(i));
        console.log(localStorage.length);
        
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

        deleteBtn.textContent = 'DELETE BOOK';
        editBtn.textContent = 'EDIT BOOK';

        node.append(author, year, pages, bookName, editBtn, deleteBtn)
        ul.appendChild(node)
    }
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
    // node.classList.add(ranId);

    let deleteBtn = document.createElement('BUTTON');
    let editBtn = document.createElement('BUTTON');

    author.textContent = authorInput;
    year.textContent = yearInput;
    pages.textContent = pagesInput;
    bookName.textContent = bookNameInput;
    
    deleteBtn.textContent = 'DELETE BOOK';
    editBtn.textContent = 'EDIT BOOK';

    deleteBtn.addEventListener('click',()=>deleteItem(node))
    editBtn.addEventListener('click', () => editItem(node))

    node.append(author, year, pages, bookName, editBtn, deleteBtn)
    ul.appendChild(node)
    
}

const deleteItem = (element) =>{
    let deletedItem = element.getAttribute('idBook');
    localStorage.removeItem(deletedItem)
    element.closest("li").remove()
    console.log(element);
    console.log(deletedItem);
    
    
}

const editingProcess = (element) => {
    let keyValue = [[author.value], [year.value], [pages.value], [bookName.value]];

    localStorage.setItem(element.className, JSON.stringify(keyValue));

    element.childNodes[0].textContent = author.value;
    element.childNodes[1].textContent = year.value;
    element.childNodes[2].textContent = pages.value;
    element.childNodes[3].textContent = bookName.value;

    const editOkBtn = document.querySelector('.editOkBtn')
    editOkBtn.remove()

    const allInputs = document.getElementsByTagName('INPUT');
    for (let i = 0; i < allInputs.length; i++) allInputs[i].value = '';
}

const addEditBtn = (element) => {
    const editOkBtn = document.querySelector('.editOkBtn')
    editOkBtn.remove();
    editOkBtn.addEventListener('click', () => editingProcess(element) )
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
})

for (let i = 0; i < liNode.length; i++) {
    const element = liNode[i];
    let editBtn = element.lastElementChild.previousElementSibling;
    let deleteBtn = element.lastElementChild;
    deleteBtn.addEventListener('click', () => deleteItem(element));
    editBtn.addEventListener('click', ()=>editItem(element))
}


