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
  var items = range.querySelectorAll("a");

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
  var current = window.location.href;//Current window location

  for (var counter = 0; counter < current.length; counter++) {
    if (current[counter] == "/") {
      var slash = counter;//Finds the last '/'
    }
  }

  current = current.slice(slash + 1,current.length);
  //Finds everything after the last '/', that is, the base file name

  var comparison = current;//To force entering the loop
  while (current == comparison) {//If same file, repeats search

    var challenges = document.getElementById("Challenge_List");//Get challenges in the challenge list (Reuse Reduce Recycle, as they say)
    challenges = challenges.querySelectorAll("a")//Gets the list of links in Challenge_List div

    var rand_value = Math.random();
    rand_value *= challenges.length;
    //Counts number of 'a' in challenges, and thus number of options

    rand_value = Math.floor(rand_value);
    //Makes the possible range of values be the first and last choice + make all numbers a whole number

    var chosen_one = challenges[rand_value].getAttribute("href");
    //Gets the chosen url from the anchor

    for (counter = 0; counter < chosen_one.length; counter++) {
      if (chosen_one[counter] == "/") {
        slash = counter;//Get the last '/'
      }
    }

    comparison = chosen_one.slice(slash + 1, chosen_one.length);
    //Comparison with base HTML file name to ensure no repeatition

  window.location.href = chosen_one;
  //Redirects webpage to chosen url, as seen here: https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
  }
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

var current = 0;

//Disc turns
function Turntable() {
  current += 0.6;//0.6 degrees every 10 milliseconds
  if (current > 360) {
    current = 0.6;//Prevent possible stack overflow by returning to 0.6
  }
  var spin = document.getElementById("You_Spin_Me_Right_Round");//Spinning element selected
  spin.style.transform = ("rotate(" + current + "deg)");//Spinning element rotated degree increases
}

//Playing Songs
if (window.location.href.slice(window.location.href.length - 8, window.location.href.length) == "OST.html") {
  var chosen_song = document.getElementById("Chosen");//Song chosen is selected
  chosen_song.addEventListener("ended", Song);//Song chosen activates a new song when it ends
}//Only occurs in "OST.html", to prevent errors in console because I have OCD


function Song() {
  var all = document.getElementById("Songs").querySelectorAll("div");//All games (of songs) selected

  //Random game is selected
  var random = Math.floor(Math.random()*all.length);
  game = all[random];

  //Random song is selected
  random = Math.floor(Math.random()*all.length);
  song = game.querySelectorAll("audio")[random];

  //Selected song is placed into id with eventListener
  chosen_song.src = song.src;
  chosen_song.play();

  //id of songs and games contain titles, "_" are globally replaced by " "
  game = game.id.replace(/_/g," ");
  song = song.id.replace(/_/g," ");

  //id of songs and games are shown on the screen
  document.getElementById("Game").innerText = " [" + game + "]";
  document.getElementById("Song").innerText = song;
}

function Radio() {
  //Joining message disappears to prevent multiple songs being played,
  //and turntable from reaching ungodly speeds (Nyoom!!!)
  var join = document.getElementById("Join");
  join.style.display = "none";

  //Rotates a little every 10 milliseconds to start turning
  setInterval(Turntable,10);

  //250 milliseconds of silence are played, followed by whatever song is selected
  chosen_song.play();
}
