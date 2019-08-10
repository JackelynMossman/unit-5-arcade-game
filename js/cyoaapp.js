// Simulates a heartbeat feature, it beats 10 times by increasing/descreasing font size of the heart icon
var myheart = setInterval(myheartbeat, 900);
var timesrun = 0;
function myheartbeat() {
	var hearticon = document.querySelector("body > div > div.introwrapper > div > h1 > i");
	timesrun += 1;
	if(timesrun === 11){
        clearInterval(myheart);
    } else if (timesrun % 2 == 0) {
		hearticon.style.fontSize = '24px';
	}
	else {
		hearticon.style.fontSize = '20px';
	}
}

// create a list that holds all of your cards and sets deck by ID
let card = document.getElementsByClassName("card");

// rest parameter represents any number of elements in the array
let cards = [...card];
const deck = document.getElementById("deck");

// # of turns
let turns = 0;
let counter = document.querySelector(".turns");
let turnsplural = document.querySelector(".turnsplural");

// # of stars, set star list by selecting all the unordered list items with class name
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");

// sets matches by class name element
let matches = document.getElementsByClassName("match");

// sets and closes popup
let popupclose = document.querySelector(".close");
let popup = document.getElementById("popupwrapper");

// creates array for opened cards storage
var selectedcards = [];

// set up the event listener for the game to start when the document.body loads
document.body.onload = startadventure();

// declare the game functionality and the order of events to start the game
function startadventure(){
	// sets the selectedcards array to empty
	selectedcards = [];
	
	// shuffles the deck of cards
	cards = shuffle(cards);

	// cycles through the # of cards and removes any existing classes
	for (var i = 0; i < cards.length; i++){
		deck.innerHTML = "";
		[].forEach.call(cards, function(item) {
		deck.appendChild(item);
	});
	cards[i].classList.remove("flip", "open", "match", "disabled");
	}

	// resets the number of turns to 0 and writes the number in the counter declared above
	turns = 0;
	counter.innerHTML = turns;
	turnsplural.innerHTML = "Turns";

	// cycles through the number of stars in the list and makes them all visible at the start of the game
	for (var i= 0; i < stars.length; i++){
		stars[i].style.color = "#ffd700";
		stars[i].style.visibility = "visible";
	}

	// sets the timer to 0
	second = 0;
	minute = 0; 
	hour = 0;
	var timer = document.querySelector(".timer");
	timer.innerHTML = "0 mins 0 secs";
	// clears the interval
	clearInterval(interval);
}

// Shuffle function from http://stackoverflow.com/a/2450976 provided by Udacity: not edits to this function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// assigns the class to the toggled card with the this selector to determine which view state the card is in
var displaycard = function (){
    this.classList.toggle("open");
    this.classList.toggle("flip");
    this.classList.toggle("disabled");
};

// function to add the opened cards to the selectedcard array and verifies if they are a match or not
function cardopen() {
	selectedcards.push(this);
	var len = selectedcards.length;
	// if there are two cards in the array continue
	if(len === 2){
		// calls the movecounter function to start counting turns
		movecounter();
		// if 1st card in array (index 0) matches the 2nd card in array (index 1) then match, else not a match
		if(selectedcards[0].type === selectedcards[1].type){
			matched();
		} else {
			nomatch();
		}
	}
};

// function for what to do with the matched cards by adding classes to control the display
function matched(){
    selectedcards[0].classList.add("match", "disabled");
    selectedcards[1].classList.add("match", "disabled");
    selectedcards[0].classList.remove("flip", "open");
    selectedcards[1].classList.remove("flip", "open");
	// resets the selectedcards array to empty for the next set of cards
    selectedcards = [];
}

// function for what to do with the cards that do not match
function nomatch(){
    selectedcards[0].classList.add("nomatch");
    selectedcards[1].classList.add("nomatch");
    setTimeout(function(){
        selectedcards[0].classList.remove("flip", "open", "nomatch");
        selectedcards[1].classList.remove("flip", "open", "nomatch");
        enable();
        selectedcards = [];
    },1200);
}

// enables the nomatch cards, disables matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matches.length; i++){
            matches[i].classList.add("disabled");
        }
    });
}

// adds event listeners to each card in the array
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displaycard);
    card.addEventListener("click", cardopen);
    card.addEventListener("click", hooray);
};

// function to count how many turns the user has taken
function movecounter(){
    turns++;
    counter.innerHTML = turns;
	
	// some logic to determine if Turns should be plural or not for proper grammar
	if (turns > 1) {
		turnsplural.innerHTML = "Turns";
	}
	
    if(turns == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        starttimer();
		turnsplural.innerHTML = "Turn";
    }

	// hides the stars based on the number of turns the user has taken
    if (turns > 3 && turns < 8){
        for( i= 0; i < 5; i++){
            if(i > 4){
                stars[i].style.visibility = "hidden";
            }
        }
    }
	else if (turns > 9 && turns < 12){
        for( i= 0; i < 5; i++){
            if(i > 3){
                stars[i].style.visibility = "hidden";
            }
        }
    }
	else if (turns > 13 && turns < 16){
        for( i= 0; i < 5; i++){
            if(i > 2){
                stars[i].style.visibility = "hidden";
            }
        }
    }
	else if (turns > 17 && turns < 20){
        for( i= 0; i < 5; i++){
            if(i > 1){
                stars[i].style.visibility = "hidden";
            }
        }
    }
    else if (turns > 21){
        for( i= 0; i < 5; i++){
            if(i > 0){
                stars[i].style.visibility = "hidden";
            }
        }
    }
}

// sets the timer variables to 0
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;

// starts the timer
function starttimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" mins "+second+" secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

// shows the congrats message in the popup
function hooray(){
    if (matches.length == 20){
        clearInterval(interval);
        totaltime = timer.innerHTML;

        // show congrats popup
        popup.classList.add("show");

        // sets the # of stars variable
        var totalstars = document.querySelector(".stars").innerHTML;

        //showing turns, rating, time on popup and some logic if turns is plural or not
		var turnplural = "turns";
		if (turns === 1) {
			turnplural = "turn";
		}
        document.getElementById("totalmoves").innerHTML = turns + " " + turnplural;
        document.getElementById("totalstars").innerHTML = totalstars;
        document.getElementById("totaltime").innerHTML = totaltime;

        // close popup
        closepopup();
    };
}

// closes the congrats popup
function closepopup(){
    popupclose.addEventListener("click", function(e){
        popup.classList.remove("show");
        startadventure();
    });
}

// gives the user the option to play game again
function restart(){
    popup.classList.remove("show");
    startadventure();
}