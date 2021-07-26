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

var condition = window.matchMedia("(min-width: 1225px)");
widthCheck(condition); // Call function when running
condition.addListener(widthCheck); // When to repeat function check (while using the same value)

/*Pseudo-Search*/
function List_Filter() {
  var search = document.getElementById("Enter_Search").value;//Get value being searched
  var range = document.querySelector("#Challenge_List")
  var items = range.querySelectorAll("p");//Get all p in #Challenge_List

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
        items[counter].style.display = "none";
      }
      else {
        items[counter].style.display = "block";
        appear += 1;
      }

      if (appear > 0) {/*Suggestions appear if there's actually stuff to show*/
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
  var challenges = document.getElementById("Challenge_List");
  challenges = challenges.querySelectorAll("a")//Gets the list of links in Challenge_List div

  var rand_value = Math.random();
  rand_value *= challenges.length;
  //Counts number of 'a' in challenges, and thus number of options

  rand_value = Math.floor(rand_value);
  //Makes all numbers a whole number

  chosen_one = challenges[rand_value].getAttribute("href");
  //Gets the chosen url from the anchor

  window.location.href = chosen_one;
  //Redirects webpage to chosen url: https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
}
