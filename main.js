
function chessTimer( callback, delay, counter, str, player ) {
  var timerId;
  var start;
  var resume;
  var remaining = delay;

  this.reset = function() {
    clearTimeout( timerId );
    counter = 240;
  };

  this.pause = function() {
    clearTimeout( timerId );
    remaining -= start - new Date();
  };

  resume = function() {
    start = new Date();
    timerId = setTimeout(
                function() {
                  remaining = delay;
                  resume();
                  callback();
                },
              remaining);

    // Decrement the selected counter
    --counter;

    // Format time sequence
    var minutes = Math.floor((counter) / 60);
    var seconds = (counter) % 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    //  document.getElementById(str).innerHTML = minutes + ':' + second;
  //  } else {
        document.getElementById(str).innerHTML = minutes + ':' + seconds;
  //  }
    // Declare winner when timer reaches 0
    if ( counter === 0 ) {
        alert( 'The winner is ' + player );
        resetTime();
    }
  };

  this.resume = resume;
};

function resetTime() {
  player1.reset();
  player2.reset();
  counter = '4:00';
  document.getElementById("counter1").innerHTML = counter;
  document.getElementById("counter2").innerHTML = counter;
  start2.removeAttribute("disabled", false);
  start1.removeAttribute("disabled", false);
};

var player1 = new chessTimer( function() {
}, 1000, 240, "counter1", "Player 1");

var player2 = new chessTimer( function() {
}, 1000, 240, "counter2", "Player 2");

// Create Player Buttons
var start1 = document.getElementById('timer1');
var start2 = document.getElementById('timer2');

start1.onclick = function switchTime1() {
  // Set active button color
  this.style.backgroundColor = "blue";
  start2.style.backgroundColor = "white";

  // Switch timer countdown
  player1.pause();
  player2.resume();

  // Prevent initing multiple setTimeouts
  this.setAttribute("disabled", true);
  start2.removeAttribute("disabled", false);

};

start2.onclick = function switchTime2() {
  // Set active button color
  this.style.backgroundColor = "blue";
  start1.style.backgroundColor = "white";

  // Switch timer countdown
  player2.pause();
  player1.resume();

  // Prevent initing multiple setTimeouts
  this.setAttribute("disabled", true);
  start1.removeAttribute("disabled", true);
};
