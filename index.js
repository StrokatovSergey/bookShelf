const form = document.querySelector('form')
const ul = document.querySelector('ul')
const button = document.querySelector('button')
const author = document.getElementById('author')
const year = document.getElementById('year')
const pages = document.getElementById('pages')
const bookName = document.getElementById('bookName')



let allTasks = localStorage.getItem('myTasks') ? 
                JSON.parse(localStorage.getItem('myTasks')) : [];


localStorage.setItem('myTasks', JSON.stringify(allTasks));

const allTasksData = JSON.parse(localStorage.getItem('myTasks'));




makeListItem = (author, year, pages, bookName) =>{
    const liItem = document.createElement('li')
    liItem.innerHTML = `<p>${author}</p> <p>${year}</p> <p>${pages}</p> <p>${bookName}</p>
    <button>edit</button> <button>delete</button>`
    ul.appendChild(liItem)
}


form.addEventListener('submit', function(event){
    
    event.preventDefault()

    makeListItem(author.value, year.value, pages.value, bookName.value)

    allTasks.push([author.value, year.value, pages.value, bookName.value])
    localStorage.setItem('myTasks', JSON.stringify(allTasks))

    // author.value = ''
})

allTasksData.forEach(element => {
    makeListItem(element);
});


console.log(Math.floor(Math.random()*555));
