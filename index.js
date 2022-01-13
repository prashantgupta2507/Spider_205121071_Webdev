var current_date = new Date();

function renderDate(){
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    var current_month = current_date.getMonth();
    var display_month = months[current_month];
    
    document.getElementById("month").innerHTML = display_month;
    document.getElementById("date_str").innerHTML = current_date.toDateString();
    
    // start day and end date of current month
    let end_date = new Date(current_date.getFullYear(),current_date.getMonth()+1,0).getDate();
    let start_day = new Date(current_date.getFullYear(),current_date.getMonth(),0).getDay();
    
    // previous month last date
    let prev_date = new Date(current_date.getFullYear(),current_date.getMonth(),0).getDate();
    
    let cells ="";
    for(i=0;i<=start_day;++i){
        if(start_day===6)
            break;
        cells+="<div class='prev-date'>"+(prev_date-start_day+i)+"</div>";
    }
    
    for(i=1;i<=end_date;++i){
        if(current_date.getDate()===i && current_date.getMonth()=== new Date().getMonth())
            cells+="<div class='today'>" + i + "</div>";
        else
            cells+="<div class='"+ i + display_month + "' onClick=onClickDate(" +"'"+ i + display_month + "')>"  + i + "</div>";
    }
    
    document.getElementsByClassName("days")[0].innerHTML = cells;
}

function moveDate(str){
    if(str==='prev')
        current_date.setMonth(current_date.getMonth()-1);
    else
        current_date.setMonth(current_date.getMonth()+1);
    renderDate();
}


// Clock Created - Digital

setInterval(showTime, 1000);
function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = "AM";
  
    if (hour > 12) {
        hour -= 12;
        am_pm = " PM";
    }
    if (hour == 0) {
        hr = 12;
        am_pm = " AM";
    }
  
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
  
    let currentTime = hour + ":" 
            + min + ":" + sec + am_pm;
  
    document.getElementById("clock")
            .innerHTML = currentTime;
}
showTime();

// Todo Task

function openTask(taskname,elmnt,color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(taskname).style.display = "block";
    elmnt.style.backgroundColor = color;
  
  }
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();

var task_date;

function onClickDate(str){
    document.getElementsByClassName("add-task")[0].style.display="flex"
    task_date = str;
}

function onAddTask(){
    let task_title= document.getElementById("task-title").value;
    let task_description = document.getElementById("task-description").value;
    if(task_title !== null && task_description !== null && task_title.trim()!=='' && task_description.trim() !== ''){
        localStorage.setItem(task_date+" "+ current_date.getFullYear(), task_title+ " description:" + task_description);
        alert("Task Added for date - " + task_date);
        document.getElementById("task-title").value=""
        document.getElementById("task-description").value=""
        document.getElementsByClassName("add-task")[0].style.display="none"
    }else{
        alert("Title and Description is Required")
    }
}