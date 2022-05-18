let form  = document.querySelector("#form")
let textInput = document.querySelector("#textInput")
let dateInput = document.querySelector("#dateInput")
let textarea = document.querySelector("#textarea")
let msg = document.querySelector("#msg") 

let tasks = document.querySelector("#tasks")
let add = document.querySelector("#add")


form.addEventListener('submit', (event) => {
    event.preventDefault()
    formValidation()
})

formValidation = () => { 
   if(textInput.value === "") {
    console.log("failure");
    msg.textContent = "Les champs ne doivent pas etre vide"   
    add.setAttribute("data-bs-dismiss", "")
    add.click()
   }
   else {
       console.log("success");
       msg.textContent = ""
       acceptData()
       add.setAttribute("data-bs-dismiss", "modal")
       add.click()

   } 
}

let data = []


let acceptData = () => {
  data.push({
    title: textInput.value, 
    date: dateInput.value ,
    description: textarea.value, 
  })

  localStorage.setItem("data", JSON.stringify(data))

  console.table(data);
 createTasks()    
}


let createTasks = () => {
    tasks.innerHTML = ""
     
    data.map((x,y)=>{
        return ( tasks.innerHTML += `
        <div id=${y}>
                <span class="fw-bold">${x.title}</span>
                <span class="small text-secondary">${x.date}</span>
                <p>${x.description}</p>
      
                <span class="options">
                  <i onClick="editTasks(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-file-pen"></i>
                  <i  onClick="deleteTasks(this); createTasks()"  class="fa-solid fa-trash"></i>
                </span>
              </div>
        `)
    })
     
 
  resetForm() 
}

let deleteTasks = (event) => {
     event.parentElement.parentElement.remove()
     data.splice(event.parentElement.parentElement.id, 1)
     localStorage.setItem("data", JSON.stringify(data))

    console.log(data);
}

let editTasks = (event) => {
  let selectedTask = event.parentElement.parentElement
  
  textInput.value = selectedTask.children[0].textContent
  dateInput.value = selectedTask.children[1].textContent
  textarea.value = selectedTask.children[2].textContent
  
  deleteTasks(event) 
}

let resetForm = () => {
    textInput.value = ""
    dateInput.value = ""
    textarea.value = ""
}

(()=> {
    data = JSON.parse(localStorage.getItem("data")) || []
    createTasks()
    console.log(data);
})() 