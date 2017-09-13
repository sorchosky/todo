//This code is applied to all of the list items that appear on load
// Create a close button and append it to each list item
var myNodeList = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodeList.length; i++){
  var span = document.createElement("SPAN");
  // txt is defined as the hex code for an "X"
  var txt = document.createTextNode("\u00d7");
  //give the span we created a class name of "close"
  span.className = "close";
  //put the hex "X" in between the span element
  span.appendChild(txt);
  //for the item at this point of the list, add an span.close to the end.
  myNodeList[i].appendChild(span);
  //the for allows this function to repeat through every li within myNodeList
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    //define "div" as the parent element of each close button, which is li
    var div = this.parentElement;
    //change the css display to none
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);


// The following code will create an element, as well as give them the same style as the existing items
// A lot of code is repeated from above since it has to be recreated in new li items
// Create a new list item when clicking on the "Add" button
function newElement() {
  //create a li element
  var li = document.createElement("li");
  //get the value of the input text field
  var inputValue = document.getElementById("todo-list-input").value;
  //Create text out of the input
  var t = document.createTextNode(inputValue);

  //create a list element and add the text node inside of the element
  li.appendChild(t);
  //if the area is empty, alert the user. If there's content, add it to the list!
  if (inputValue === ''){
    alert("You must write something to add to the list");
  } else {
    document.getElementById("todo_list").appendChild(li);
  }
  //get the value of the todo list section.
  document.getElementById("todo-list-input").value = "";

  //create a span element
  var span = document.createElement("SPAN");
  //create a variable with the hex character
  var txt = document.createTextNode("\u00D7");
  //give the span a class of "close"
  span.className = "close";
  //put the hex character within the span element
  span.appendChild(txt);
  //put the entire new span element within the list element created
  li.appendChild(span);

  //if it's clicked, close it.
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function(){
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
