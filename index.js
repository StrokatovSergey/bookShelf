const form = document.querySelector('form')
const ul = document.querySelector('ul')
const button = document.querySelector('button')
const author = document.getElementById('author')
const year = document.getElementById('year')
const pages = document.getElementById('pages')
const bookName = document.getElementById('bookName')


for (var i = 0; i < localStorage.length; i++){
    let currentTask = JSON.parse(localStorage.getItem(localStorage.key(i)));
    const node = document.createElement("LI");
    let author = document.createElement('SPAN');
    let year = document.createElement('SPAN');
    author.textContent = currentTask[0];
    year.textContent = currentTask[1];
    node.append(author,year)
    ul.appendChild(node)
}


let totalTask = [];


makeListItem = (authorInput, yearInput) =>{

    const node = document.createElement("LI");
    let author = document.createElement('SPAN');
    let year = document.createElement('SPAN');
    author.textContent = authorInput;
    year.textContent = yearInput;

    node.append(author,year)
    console.log(node);
    
    ul.appendChild(node)
    author.value = year.value = '';
}


form.addEventListener('submit', function(event){
    
    event.preventDefault()

    makeListItem(author.value, year.value)
    let arrTasks = [];
    let ranId = Math.floor(Math.random()*555);
    arrTasks.push([author.value],[year.value])
    localStorage.setItem(ranId, JSON.stringify(arrTasks))
})
