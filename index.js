const state={
    taskList:[]
};
//DOM operations
const task_contents=document.querySelector(".task__contents");
const task_modal=document.querySelector(".task__modal__body"); 
//Template for the card on the screen
const htmlCardContents=({id,url,title,type,description})=>`
   <div class="col-md-6 col-lg-4 mt-3" id =${id}>
     <div class="card shadow-sm task__card">
     <div class="card-header d-flex justify-content-end task__card__header">
       <button type="button" class="btn btn-outline-primary mr=1.5" name=${id} onclick="editTask.apply(this,arguments)">
       <i class="fas fa-pencil-alt name=${id}"></i>
       </button>
       <button type="button" class="btn btn-outline-danger mr=1.5" name=${id} onclick="deleteTask.apply(this,arguments)">
       <i class="fas fa-trash-alt" name="${id}" ></i>
       </button>
     </div>
     <div class="card-body">
      ${  
        // url &&
         //`<img width="100%" src=$[url} alt="Card Image" class="card-img-top md-3 rounded-lg"/>`
         url?`<img width="100%" src=${url} alt="Card Image" class="card-img-top  md-3 rounded-lg"/> `:
       `<img width="100%" src="https://wiki.tripwireinteractive.com/TWIimages/4/47/Placeholder.png?20121020050736" alt="Card Image" class="card-img-top  md-3 rounded-lg"/> `
      }
      <h4 class="card-title  task__card__title">${title}</h4>
      <p class="description trim-3-lines text-muted">${description}</p>
      <div class="inputTaskType text-white d-flex flex-wrap"> 
      <span class="badge bg-primary m-1">${type}</span>
      </div>
     </div>
     <div class="card-footer">
       <button class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#singleModal" type="button" id=${id} onclick="openTask()">Open Task</button>
     </div>
     </div>
     
   </div>

`;


//Single task body
const htmlSingleCardContents=({id,url,title,description})=>
{
    const date=new Date(parseInt(id));
    return `
    <div id=${id}>
    ${  
        //url &&
       // `<img width="100%" src=${url} alt="Card Image" class="img-fluid place__holder__image mb-3"/> `
       //https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=1024x1024&w=is&k=20&c=9Qfj9S124ojed7s4OWu3a3vbbMC76QYkqczg4L4M-Sc=
       url?`<img width="100%" src=${url} alt="Card Image" class="img-fluid place__holder__image mb-3"/> `:
       `<img width="100%" src="https://wiki.tripwireinteractive.com/TWIimages/4/47/Placeholder.png?20121020050736" alt="Card Image" class="img-fluid place__holder__image mb-3"/> `
     }
     <strong class="text-muted text-sm">Created on: ${date.toDateString()}</strong>
     <h2 class="my-3">${title}</h2>
     <p class="text-muted">${description}</p>
     </div>
    `;
};
const updateLocalStorage=()=>{
    localStorage.setItem(
        "task",JSON.stringify({tasks:state.taskList,})
    );
};

const loadInitialData=()=>{
  const localStorageCopy=JSON.parse(localStorage.task);
  if(localStorageCopy)
    state.taskList=localStorageCopy.tasks;
  state.taskList.map((cardDate)=>{
    task_contents.insertAdjacentHTML("beforeend",htmlCardContents(cardDate));
  });
};

const handleSubmit=(event)=>{
  const id=`${Date.now()}`;
  const input={
    url:document.getElementById("inputImageURL").value,
    title:document.getElementById("inputTaskTitle").value,
    type:document.getElementById("inputTaskType").value,
    description:document.getElementById("inputTaskDescription").value,
  };
  if (input.title===""|| input.type===""|| input.description==="")
    return alert("Please fill all the required fields");
    task_contents.insertAdjacentHTML("beforeend",htmlCardContents({...input,id}));
  state.taskList.push({...input,id});
  updateLocalStorage();
}

//open task
const openTask = (e) => {
  if(!e) e=window.event;
  const getTask=state.taskList.find(({id})=> id === e.target.id);
  task_modal.innerHTML=htmlSingleCardContents(getTask);
}
//delete task
const deleteTask = (e) => {
  const targetId=e.target.getAttribute("name");
  const type=e.target.tagName;
  console.log(type);
  const removeTask=state.taskList.filter(({id})=> id!=targetId);
  state.taskList=removeTask;
  updateLocalStorage();
  if(type=="BUTTON"){
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode);
    }
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode.parentNode);
}

const editTask=(e)=>{
  //const targetName=e.target.getAttribute("name");
  //const targetId=e.target.id;
  const type=e.target.tagName;
  let parentNode;
  let taskTitle;
  let taskDescription;
  let taskType;
  let submitButton;
  if(type==="BUTTON"){
    parentNode=e.target.parentNode.parentNode;
  }
  else  {
    parentNode=e.target.parentNode.parentNode.parentNode;
  }
  taskTitle=parentNode.childNodes[3].childNodes[3];
  taskDescription=parentNode.childNodes[3].childNodes[5];
  taskType=parentNode.childNodes[3].childNodes[7].childNodes[1];
  submitButton=parentNode.childNodes[5].childNodes[1];

  taskTitle.setAttribute("contenteditable","true");
  taskDescription.setAttribute("contenteditable","true");
  taskType.setAttribute("contenteditable","true");
  submitButton.setAttribute("onclick","saveEdit.apply(this,arguments)");
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");
  submitButton.innerHTML="Save Changes";

};

const saveEdit=(e)=>{
   const targetId=e.target.id;
   const parentNode=e.target.parentNode.parentNode;
   const  taskTitle=parentNode.childNodes[3].childNodes[3];
   const  taskDescription=parentNode.childNodes[3].childNodes[5];
  const taskType=parentNode.childNodes[3].childNodes[7].childNodes[1];
  const submitButton=parentNode.childNodes[5].childNodes[1];

  const updateData={
    taskTitle:taskTitle.innerHTML,
    taskDescription:taskDescription.innerHTML,
    taskType:taskType.innerHTML,
  };
  console.log(updateData.taskTitle);
 let stateCopy=state.taskList;
 stateCopy=stateCopy.map((task)=>
  task.id ===targetId?{
  id:task.id,
  title:updateData.taskTitle,
  description:updateData.taskDescription,
  type:updateData.taskType,
  url:task.url,
 }:task
 );
 state.taskList=stateCopy;
 updateLocalStorage();
 taskTitle.setAttribute("contenteditable","false");
  taskDescription.setAttribute("contenteditable","false");
  taskType.setAttribute("contenteditable","false");
  submitButton.setAttribute("onclick","openTask.apply(this,arguments)");
  submitButton.setAttribute("data-bs-toggle","modal");
  submitButton.setAttribute("data-bs-target","#singleModal");
  submitButton.innerHTML="Open Task";
};

//Search
const searchTask=(e)=>{
   while(task_contents.firstChild){
    task_contents.removeChild(task_contents.firstChild);
   }
   const resultData=state.taskList.filter(({title})=> title.toLowerCase().includes(e.target.value.toLowerCase()));
    
    resultData.map((cardDate)=>{
      task_contents.insertAdjacentHTML("beforeend",htmlCardContents(cardDate));
    });

};



