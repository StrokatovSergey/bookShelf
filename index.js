const form = document.querySelector('form')
const ul = document.querySelector('ul')
const button = document.querySelector('button')
const author = document.getElementById('author')
const year = document.getElementById('year')
const pages = document.getElementById('pages')
const bookName = document.getElementById('bookName')



const startWork = ()=>{
    for (var i = 0; i < localStorage.length; i++) {
        let currentTask = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let nameOfClass = localStorage.key(i);
        const node = document.createElement("LI");
        node.classList.add(nameOfClass)

        let author = document.createElement('SPAN');
        let year = document.createElement('SPAN');
        let deleteBtn = document.createElement('BUTTON');

        deleteBtn.textContent = 'DELETE BOOK';
        deleteBtn.classList.add(nameOfClass);
        author.textContent = currentTask[0];
        year.textContent = currentTask[1];

        node.append(author, year, deleteBtn)
        ul.appendChild(node)
    }
}
const deleteAllList = ()=>{
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}
startWork();


let deleteBtns = ul.getElementsByTagName('BUTTON');

const deleteItem = (element) =>{
    let deletedItem = element.className;
    localStorage.removeItem(deletedItem)
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    startWork()
}

for (const key in deleteBtns) {
    if (deleteBtns.hasOwnProperty(key)) {
        const element = deleteBtns[key];
        element.addEventListener('click', () => deleteItem(element))
    }
}



makeListItem = (authorInput, yearInput, className) =>{

    const node = document.createElement("LI");
    // node.classList.add(className)
    let author = document.createElement('SPAN');
    let year = document.createElement('SPAN');
    let deleteBtn = document.createElement('BUTTON');

    author.textContent = authorInput;
    year.textContent = yearInput;
    deleteBtn.textContent = 'DELETE BOOK';

    node.append(author, year, deleteBtn)
    console.log(node);
    
    ul.appendChild(node)
    author.value = year.value = '';
}


form.addEventListener('submit', function(event){
    
    event.preventDefault()
    let ranId = Math.floor(Math.random() * 999);
    makeListItem(author.value, year.value, ranId)
    let arrTasks = [];
    
    arrTasks.push([author.value],[year.value])
    localStorage.setItem(ranId, JSON.stringify(arrTasks))
})
