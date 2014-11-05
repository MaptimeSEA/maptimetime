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

  // loop through dates
  for (var i=0; i<data.length; i++) {

    // create event element
    var item = document.createElement("li");
    item.className="event";
    item.innerHTML="<h4>"+data[i].whichchapter+"</h4><p class='event-date'>"+data[i].datetime+"</p>";
    item.innerHTML+="<p class='event-location'>"+data[i].locationname+", <span>"+data[i].locationaddress+"</span></p>";
    events.appendChild(item);

  }

}

function makeTimestamp(time) {

}