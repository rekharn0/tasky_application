const state={
    taskList:[]
};
//DOM operations
const task_contents=document.querySelector(".task__contents");

//Template for the card on the screen
const htmlCardContents=({id,url,title,type,description})=>`
   <div class="col-md-6 col-lg-4 mt-3" id =${id}>
     <div class="card shadow-sm task_card">
     <div class="card_header d-flex justify_content_end task__card__header">
       <button type="button" class="btn btn-outline-primary mr=1.5" name=${id}>
       <i class="fas fa-pencil-alt name${id}"></i>
       </button>
       <button type="button" class="btn btn-outline-danger mr=1.5" name=${id}>
       <i class="fas fa-trash-alt name${id}"></i>
       </button>
     </div>
     <div class="card-body">
      ${  
         url &&
         `<img width="100%" src=$[url} alt="Card Image" class="card-img-top md-3 rounded-lg"/> `
      }
      <h4 class="card-title  task__card__title">${title}</h4>
      <p class="description trim-3-lines text-muted">${description}</p>
      <div class="inputTaskType text-white d-flex flex-wrap"> 
      <span class="badge bg-primary m-1">${type}</span>
      </div>
     </div>
     <div class="card-footer">
       <button class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#singleModal" type="button">Open Task</button>
     </div>
     </div>
     
   </div>

`;


//Single task body
const htmlSingleCardContents=({id,url,title,type,description})=>
{
    const date=new Date();
    return `
    <div id=${id}
    ${  
        url &&
        `<img width="100%" src=$[url} alt="Card Image" class="img-fluid place__holder__image mb-3"/> `
     }
     <strong class="text-muted text-sm">Created on: ${date.toDateString()}</strong>
     <h2 class="my-3">${title}</h2>
     <p class="text-muted">${description}</p>
     </div>
    `;
}
const updateLocalStorage=()=>{
    localStorage.setItem(
        "tasky",JSON.stringify({tasks:state.taskList,})
    );
};



