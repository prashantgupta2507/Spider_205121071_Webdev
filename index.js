var current_date = new Date();

// Calendar Created

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function renderDate(){
    
    
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
        cells+="<div class='prev-date " +(prev_date-start_day+i) + " " + display_month + "' onClick=onClickDate(" + "'"+(prev_date-start_day+i)+ display_month + "')>"+ (prev_date-start_day+i)+"</div>";
    }
    
    for(i=1;i<=end_date;++i){
        if(current_date.getDate()===i && current_date.getMonth()=== new Date().getMonth())
            cells+="<div class='today " + i + " " + display_month + "' onClick=onClickDate(" + "'"+ i + display_month + "')>"+ i+"</div>";
        else
            cells+="<div class='" + i +' '+ display_month+ "'" + "onclick=onClickDate('" + i + display_month + "')>" + i + "</div>";
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
    document.getElementById(taskname).style.display = "grid";
    elmnt.style.backgroundColor = color;
  
  }
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();

var task_date;

function onClickDate(str){
    document.getElementsByClassName("add-task")[0].style.display="flex"
    task_date = str;
    if(document.getElementById('task-date').innerHTML!=null)
    document.getElementById('task-date').innerHTML=null;
    document.getElementById('task-date').innerHTML= "Date: " + task_date;
}

function onAddTask(){
    let task_time = document.getElementById('task-time').value;
    let task_title= document.getElementById("task-title").value;
    let task_description = document.getElementById("task-description").value;
    if(task_title !== null && task_description !== null && task_title.trim()!=='' && task_description.trim() !== ''){
        localStorage.setItem(task_date+"-"+ current_date.getFullYear()+"-Time:"+ task_time, task_title+ " description:" + task_description);
        alert("Task Added for date - " + task_date);
        document.getElementById("task-title").value=""
        document.getElementById("task-description").value=""
        document.getElementById("task-time").value=""
        document.getElementsByClassName("add-task")[0].style.display="none"
        tasks();
    }else{
        alert("Title and Description is Required")
    }
}

var items,keys,item,time,date, montharray,tasklist;
var values = [];
var Pending="<h6>Date</h6><h6>Title</h6><h6>Description</h6><h6></h6>";
var Upcoming="<h6>Date</h6><h6>Title</h6><h6>Description</h6><h6></h6>";
var today ="<h6>Date</h6><h6>Title</h6><h6>Description</h6><h6></h6>";


function tasks(){
    console.log("chayan")
    tasklist = {...localStorage};
    Pending="<h6>Date</h6><h6>Title</h6><h6>Description</h6><h6></h6>";
    Upcoming="<h6>Date</h6><h6>Title</h6><h6>Description</h6><h6></h6>";
    today ="<h6>Date</h6><h6>Title</h6><h6>Description</h6><h6></h6>";
    for(const [key,value] of Object.entries(tasklist)){
        if(Number(key.charAt(1))>=0 && Number(key.charAt(1)<10)){
            date = Number(key.substring(0,2));
            montharray = key.split("-");
            month = montharray[0].substring(2);
            year = Number(montharray[1]);
            time = montharray[2].substring(5);
        }
        else{
            date = Number(key.charAt(0));
            montharray = key.split("-");
            month = montharray[0].substring(1);
            year = Number(montharray[1]);
            time = montharray[2].substring(5);
        }

        let monthValue;
        for(i =0;i<months.length;++i){
            if(months[i]===month)
                monthValue = i;
        }
        
        let new_date = new Date(year, monthValue, date);
        title = value.substring(0,value.indexOf("description")-1);
        if(title.length>10)
            title = title.substring(0,11)+"..."
        description = value.substring(value.indexOf("description")+12);
        if(description.length>10)
            description = description.substring(0,11)+"..."
        if(new Date().getFullYear() === new_date.getFullYear() && new Date().getMonth() === new_date.getMonth() && new Date().getDate() === new_date.getDate())
        {
            today+="<p>" + new_date.toDateString().substring(0,15) +" "+time + "</p>"
            today+="<h6>" + title + "</h6>"
            today+="<p>" + description + "</p>"
            today+="<i class='fas fa-trash-alt' onclick=deleteTask('" + key + "')></i>"
        }
        if(new Date().getFullYear()<new_date.getFullYear())
        {
            Upcoming+="<p>" + new_date.toDateString().substring(0,15)+" "+time + "</p>"
            Upcoming+="<h6>" + title + "</h6>"
            Upcoming+="<p>" + description + "</p>"
            Upcoming+="<i class='fas fa-trash-alt' onclick=deleteTask('" + key + "')></i>"
        }
        else if(new Date().getMonth()<new_date.getMonth())
        {
            Upcoming+="<p>" + new_date.toDateString().substring(0,15)+" "+time + "</p>"
            Upcoming+="<h6>" + title + "</h6>"
            Upcoming+="<p>" + description + "</p>"
            Upcoming+="<i class='fas fa-trash-alt' onclick=deleteTask('" + key + "')></i>"
        }
        else if(new Date().getDate()<new_date.getDate())
        {
            Upcoming+="<p>" + new_date.toDateString().substring(0,15)+" "+time + "</p>"
            Upcoming+="<h6>" + title + "</h6>"
            Upcoming+="<p>" + description + "</p>"
            Upcoming+="<i class='fas fa-trash-alt' onclick=deleteTask('" + key + "')></i>"
        }
        else
        {
            if(new Date().getFullYear() === new_date.getFullYear() && new Date().getMonth() === new_date.getMonth() && new Date().getDate() === new_date.getDate());
            else{
            Pending+="<p>" + new_date.toDateString().substring(0,15)+" "+time + "</p>"
            Pending+="<h6>" + title + "</h6>"
            Pending+="<p>" + description + "</p>"
            Pending+="<i class='fas fa-trash-alt' onclick=deleteTask('" + key + "')></i>"
            }
        }
    }
    document.getElementById('Pending').innerHTML = Pending;
    document.getElementById('Upcoming').innerHTML = Upcoming;
    document.getElementById('Today').innerHTML = today;
}

tasks();

function deleteTask(key){
    localStorage.removeItem(key)
    tasks();
}

setInterval(() => {
    d = new Date(); //object of date()
    hr = d.getHours();
    min = d.getMinutes();
    sec = d.getSeconds();
    hr_rotation = 30 * hr + min / 2; //converting current time
    min_rotation = 6 * min;
    sec_rotation = 6 * sec;
  
    hour.style.transform = `rotate(${hr_rotation}deg)`;
    minute.style.transform = `rotate(${min_rotation}deg)`;
    second.style.transform = `rotate(${sec_rotation}deg)`;
}, 1000);

var flag = 1;

function showClock(){
    if(flag){
        document.getElementById('clock').style.display='none'
        document.getElementById('clockContainer').style.removeProperty('display');
        flag=0;
    }else{
        document.getElementById('clock').style.display='flex'
        document.getElementById('clockContainer').style.display='none'
        flag=1;
    }
        
}