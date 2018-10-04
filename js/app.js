/*
 * Create a list that holds all of your cards
 */
 var listOfCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", 
 "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];

// get shuffled cards
listOfCards = shuffle(listOfCards);
var attempts = 0;
var twoStarRatingAttmepts = 20;
var oneStarRatingAttmepts = 30;
var previousCardClicked = "";
var time_secs = 0;
var time_mins = 0;
var tickTimer = null;

// Shuffle function from http://stackoverflow.com/a/2450976
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

// increment timer
function tick() {
	time_secs++;
	if (time_secs === 60) {
		time_secs = 0;
		time_mins++;
	}
	$(".time").text((time_mins<10?"0"+time_mins:time_mins) + ":" + (time_secs<10?("0"+time_secs):time_secs));
}

// draw cards initially
function renderCards() {
	for (var i of listOfCards) {
		$(".deck").append('<li class="card card-'+i+'" data-fa="'+i+'"><i class="fa '+i+'"></i></li>');
	}
}

// check if all cards are flipped
function checkWin() {
	var cardsFliped = $(".match-permanent").length;
	console.log(cardsFliped);
	if (cardsFliped === 16) {
		showResult();
	}

}

// show results
function showResult() {
	clearInterval(tickTimer);
	$(".score-panel").fadeOut();
	$(".deck").fadeOut();
	$(".result-panel").fadeIn();
}

// performe initialisation functions
function initialise() {
	renderCards();
	handleClicks();
	$(".restart").click(handleRestart);
}

// restart game
function handleRestart() {
	listOfCards = shuffle(listOfCards);
	clearInterval(tickTimer);
	time_secs = 0;
	time_mins = 0;
	attempts = 0;
	$(".card").removeClass("match-permanent");
	$(".time").text((time_mins<10?"0"+time_mins:time_mins) + ":" + (time_secs<10?("0"+time_secs):time_secs));
	$(".moves").text(attempts);
	$(".fa-star").addClass("fagold");
	$(".score-panel").fadeIn();
	$(".deck").fadeIn();
	$(".result-panel").fadeOut();
}

// increment attempts
function incrementMoves() {
	attempts++;
	$(".moves").text(attempts);
	if (attempts == oneStarRatingAttmepts) {
		$(".star2").removeClass("fagold");
	}
	if (attempts == twoStarRatingAttmepts) {
		$(".star3").removeClass("fagold");
	}
}

// handle clicks on cards 
function handleClicks() {
	$(".card").click(function(event){
		if (attempts == 0) 
			tickTimer = setInterval(tick,1000);
		var cardName = $(event.target).data("fa");
		if (!($(event.target).hasClass("match"))) {
			incrementMoves();
			if (previousCardClicked == "") {
				// new click
				previousCardClicked = cardName;
				$(event.target).addClass("match");
			}
			else if (previousCardClicked == cardName) {
				// successful match
				$(".card-"+cardName).addClass("match-permanent");
				previousCardClicked = "";
				checkWin();
			}
			else {
				// unsuccessful
				$(event.target).addClass("match");
				var pr = previousCardClicked;
				var cr = event.target;
				setTimeout(function(){
					$(".card-"+pr).removeClass("match");
					$(cr).removeClass("match")
				},600);
				previousCardClicked = "";
			}
		}
	});
}
initialise();
