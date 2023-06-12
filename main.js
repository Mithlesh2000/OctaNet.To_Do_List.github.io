/*Variables*/
let theTasksCont = document.querySelector("main .to-do-list .tasks"),
  theInput = document.querySelector("main .to-do-list .add-task input"),
  theBtnAddTask = document.querySelector("main .to-do-list .add-task span"),
  theAllTasks = document.querySelector(
    "main .to-do-list .content-act .status span:first-child"
  ),
  theCompletedTasks = document.querySelector(
    "main .to-do-list .content-act .status span:nth-child(2)"
  ),
  TheBtnRemoveAll = document.querySelector(
    "main .to-do-list .content-act .del i"
  ),
  theProg = document.querySelector(
    "main .to-do-list .content-act .status span:last-child"
  ),
  theProgIcon = document.querySelector(
    "main .to-do-list .content-act .status span:last-child i"
  ),
  theTodoList = document.querySelector("main .to-do-list"),
  theNoTasks = document.querySelector("main .to-do-list .no-tasks"),
  addAudio = document.getElementById("addAud"),
  removeAudio = document.getElementById("removeAud"),
  arrAllTasks = [],
  arrCompletedTasks = [],
  countAllTasks = 0,
  countCompletedTasks = 0;

/*-----Add Task-----*/
// disRemoveAll(0);
theBtnAddTask.addEventListener("click", () => {
  if (theInput.value == "") {
    //Use Sweet Alert 2
    Swal.fire({
      icon: "warning",
      title: "Empty Task !",
      text: "You Can't Add Empty Task , Please Write Something",
      showConfirmButton: true,
      confirmButtonText: "Ok",
      // showCancelButton: true,
      // cancelButtonText: "Cancel It",
      showCloseButton: true,
    });
  } else {
    //Create Element Div
    let taskDiv = document.createElement("div");
    //Add Class task To The Div
    taskDiv.className = "task";
    //Create Element Div For Content 1
    let contDiv1 = document.createElement("div");
    //Add Class cont-1 To Div 1
    contDiv1.className = "cont-1";
    //Add Icon To Add And The Task Text
    contDiv1.innerHTML = `
    <i class="fa-regular fa-circle done-one"></i>
    <p class="task-text myta">${theInput.value}</p>
    `;
    //Create Element Div For Content 2
    let contDiv2 = document.createElement("div");
    //Add Class cont-2 To Div 2
    contDiv2.className = "cont-2";
    //Add Icon To Delete And To complete Task
    contDiv2.innerHTML = `
    <i class="fa-solid fa-trash-can delete-one"></i>
    `;
    //Append cont 1 and cont 2 To Div Task
    taskDiv.appendChild(contDiv1);
    taskDiv.appendChild(contDiv2);
    //Append Div Task To Div Tasks
    theTasksCont.appendChild(taskDiv);
    allTasksNumAdd();
    //Array Of All Tasks
    arrAllTasks = [...theTasksCont.children];
    //Event : Click Remove All Tasks : Loop All Tasks And Remove One By One
    TheBtnRemoveAll.addEventListener("click", () => {
      arrAllTasks.forEach((task, index) => {
        task.remove();
      });
      noTasks(0);
      //Add Audio Sound When You Remove All Tasks
      removeAudio.play();
      setTimeout(() => {
        location.reload();
      }, 800);
    });

    noTasks(arrAllTasks.length);
    //Make The Input Empty After Add
    theInput.value = "";
    //Add Audio Sound When You Add Task
    addAudio.play();
  }
});

/*-----Process The Added Task------*/
document.addEventListener("click", (e) => {
  //Delete Task
  if (e.target.classList.contains("delete-one")) {
    //Add Audio Sound When You Remove One Task
    removeAudio.play();
    e.target.parentNode.parentNode.remove();
    allTasksNumDif();
    if (e.target.parentNode.parentNode.classList.contains("finished")) {
      completedTasksNumDif();
    }
    arrAllTasks.length--;
    noTasks(arrAllTasks.length);
    if (arrAllTasks.length == 0) {
      location.reload();
    }
  }
  if (e.target.classList.contains("done-one")) {
    e.target.classList.toggle("cirl");
    e.target.parentNode.classList.toggle("completed");
    e.target.parentNode.parentNode.classList.toggle("finished");
    if (e.target.parentNode.classList.contains("completed")) {
      completedTasksNumAdd();
    } else {
      completedTasksNumDif();
    }
  }
});

/*--------Count Numbers Of All Tasks----------*/
//When You Add Task
function allTasksNumAdd() {
  countAllTasks++;
  theAllTasks.innerHTML =
    countAllTasks > 9
      ? `Tasks : ${countAllTasks}`
      : `Tasks : 0${countAllTasks}`;
}
//When You Remove Task
function allTasksNumDif() {
  countAllTasks--;
  theAllTasks.innerHTML =
    countAllTasks > 9
      ? `Tasks : ${countAllTasks}`
      : `Tasks : 0${countAllTasks}`;
}

/*--------Count Numbers Of Completed Tasks----------*/
//When You Complete Task
function completedTasksNumAdd() {
  countCompletedTasks++;
  theCompletedTasks.innerHTML =
    countCompletedTasks > 9
      ? `Completed : ${countCompletedTasks}`
      : `Completed : 0${countCompletedTasks}`;
  checkStatus();
}
//When You Don't Complete Task
function completedTasksNumDif() {
  if (countCompletedTasks > 0) {
    countCompletedTasks--;
    theCompletedTasks.innerHTML =
      countCompletedTasks > 9
        ? `Completed : ${countCompletedTasks}`
        : `Completed : 0${countCompletedTasks}`;
    checkStatus();
  }
}

/*--------Check Status----------*/
//Status : Not Start - In Progress - Done
function checkStatus() {
  if (countCompletedTasks == countAllTasks) {
    theProg.innerHTML = `<i class="fa-regular fa-face-laugh"></i>
  Done `;
    theProg.className = "do";
  } else if (countCompletedTasks > 0) {
    theProg.innerHTML = `<i class="fa-regular fa-face-smile-wink"></i>
       In Progress`;
    theProg.className = "inpo";
  } else {
    theProg.innerHTML = ` <i class="fa-regular fa-face-meh-blank"></i>
      Not Start`;
    theProg.className = "nts";
  }
}

/*--------Display Or Not : Div No Tasks  - And Disabled  Or Not : Remove Span ----------*/
TheBtnRemoveAll.parentNode.setAttribute("disabled", "");
TheBtnRemoveAll.parentNode.style.cursor = "not-allowed";
TheBtnRemoveAll.parentNode.style.opacity = "0.7";
function noTasks(NumTasks) {
  if (NumTasks == 0) {
    theNoTasks.style.display = "block";
  } else {
    theNoTasks.style.display = "none";
    TheBtnRemoveAll.parentNode.removeAttribute("disabled");
    TheBtnRemoveAll.parentNode.style.cursor = "pointer";
    TheBtnRemoveAll.parentNode.style.opacity = "1";
  }
}
