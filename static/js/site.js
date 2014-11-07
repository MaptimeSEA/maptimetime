jQuery(document).ready(function($){
  // test spreadsheet key 1kswO9zq5UgQCdPwndBmQGtKhQtbQw8xSQhqHLcQHxKU
  Tabletop.init({
    key: '1kswO9zq5UgQCdPwndBmQGtKhQtbQw8xSQhqHLcQHxKU',
    orderby: 'datetime', // response comes in date order! SO AWESOME.
    callback: dates,
    simpleSheet: true } )
});

function dates(data, tabletop) {
  
  // today's date
  var today = new Date();
  var events = document.getElementById("events");
  var dates = []; // used to make sure we only print a date once

  // loop through dates
  for (var i=0; i<data.length; i++) {

    // create date object
    var date = time(data[i].datetime);
    console.log(date);

    // check date to make new date item if it hasn't been pushed yet
    if(dates.indexOf(date.day)==-1) {
      var dateItem = document.createElement("li");
      dateItem.className = "date";
      dateItem.innerHTML = date.day;
      events.appendChild(dateItem);
      dates.push(date.day); // push into array for next check
    }

    // create event element
    var item = document.createElement("li");
    item.className="event";
    if(date.d<today) {
      item.className+=" past";
    }
    item.innerHTML="<h4 class='chapter'>"+data[i].whichchapter+"<span class='event-time'>" + date.time + "</span></h4>";
    item.innerHTML+="<p class='event-location'><a href='http://maps.google.com/?q="+data[i].locationname + " " + data[i].locationaddress + "' target='_blank'>"+data[i].locationname+", <span>"+data[i].locationaddress+"</span></a></p>";
    events.appendChild(item);

  }

}

// date and time functions for returning nice names
function time(time) {
  var d = new Date(time);
  return {
    d: d,
    day: weekday(d.getDay()) + ", " + month(d.getMonth()) + " " + ordinalsuffix(d.getDay()),
    time: meetingTime(d)
  }
}
function weekday(d) {
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[d];
}
function month(d) {
  months = ["January","February","March","April","May","June","July","August","September","October","November","December",];
  return months[d];
}
function ordinalsuffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
function meetingTime(t) {
  return ((t.getHours() < 10)?"0":"") + ((t.getHours()>12)?(t.getHours()-12):t.getHours()) + ":" + ((t.getMinutes() < 10)?"0":"") + t.getMinutes() + ((t.getHours()>12)?('PM'):'AM');
}


