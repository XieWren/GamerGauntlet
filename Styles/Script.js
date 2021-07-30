/*Sidenav*/
function openNav() {
  document.getElementById("sidenav").style.width = "250px"; //Increase width for navigation bar; makes it look like moving outwards
}
function closeNav() {//Back to default; closes menu
  document.getElementById("sidenav").style.width = "0px";
}

/*Auto-close Sidenav at 1225px width*/
function widthCheck(condition) {
  if (condition.matches) { // If media query matches
    closeNav();
  }
}

var condition = window.matchMedia("(min-width: 1225px)");//Condition: Width of window reaches >=1225px
widthCheck(condition); // Call function when running
condition.addListener(widthCheck); // When to repeat function check (while using the same value)

/*Pseudo-Search*/
function List_Filter() {
  var search = document.getElementById("Enter_Search").value;//Get value being searched

  //Get all p in #Challenge_List
  var range = document.querySelector("#Challenge_List")
  var items = range.querySelectorAll("p");

  if (search == "") {
    range.style.display = "none";//Nothing appears if nothing triggered
  }

  else {

    search = search.toUpperCase();//Make non case-sensitive
    let appear = 0;

    for (var counter = 0; counter < items.length; counter++) {
      var item = items[counter].innerText;//Get values in #Challenge_List, one at a time.

      check = item.toUpperCase();//Make non case-sensitive
      if (check.indexOf(search) == -1) {//Value is -1 when no index is available; which also means text is not found
        items[counter].style.display = "none";//Text is not displayed
      }
      else {
        items[counter].style.display = "block";//Text is displayed, row by row
        appear += 1;
      }

      if (appear > 0) {/*Suggestions appear if there's actually stuff to show; helps to ensure a blank rectange is not shown*/
        range.style.display = "block";
      }
      else {
        range.style.display = "none";
      }
    }
  }
}

/*Random Challenge*/
function Very_Random() {
  var challenges = document.getElementById("Challenge_List");//Get challenges in the challenge list (Reuse Reduce Recycle, as they say)
  challenges = challenges.querySelectorAll("a")//Gets the list of links in Challenge_List div

  var rand_value = Math.random();
  rand_value *= challenges.length;
  //Counts number of 'a' in challenges, and thus number of options

  rand_value = Math.floor(rand_value);
  //Makes the possible range of values be the first and last choice + make all numbers a whole number

  chosen_one = challenges[rand_value].getAttribute("href");
  //Gets the chosen url from the anchor

  window.location.href = chosen_one;
  //Redirects webpage to chosen url, as seen here: https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
}

function FormProcessor() {
  var answers = document.querySelectorAll("textarea");//Get all the inputs
  var success = "Yes";//Initialise for checking later
  for (counter = 0;counter<answers.length;counter++) {
    if (answers[counter].value == "") {//Check if individual textareas are filled in
      document.getElementById("Error").style.display = "inline";//Error message pops up if not filled in
      success = "No";//Prevents getting sent to response page
    }
  }
  if (success == "Yes") {
    window.location.href = "Response.html";//Gets sent to response page because everything is filled in
  }
}

function TopThree(chosen) {
  var possibilities =
    [document.getElementById("First"),//List of all the three possible chosen descriptions
    document.getElementById("Second"),
    document.getElementById("Third")];

  for (let counter = 0; counter<3; counter++) {
    if (chosen == possibilities[counter]) {//Check for the bar chosen, to show the corresponding text
      possibilities[counter].style.display = "inline";//The chosen one appears
    }
    else if (possibilities[counter].style.display == "inline") {
      possibilities[counter].style.display = "none";//The previously chosen disappears
    }
  }
}

function One() {
  var chosen = document.getElementById("First");//The 1st bar is chosen
  TopThree(chosen);
}

function Two() {
  var chosen = document.getElementById("Second");//The 2nd bar is chosen
  TopThree(chosen);
}

function Three() {
  var chosen = document.getElementById("Third");//The 3rd bar is chosen
  TopThree(chosen);
}
