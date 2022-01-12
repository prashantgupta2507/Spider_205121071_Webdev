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
    console.log(start_day)
    
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
            cells+="<div>" + i + "</div>";
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