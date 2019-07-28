// Start button
var startButton = document.querySelector("#js--start");
// Stop button
var stopButton = document.querySelector("#js--stop");
// Reset button
var resetButton = document.querySelector("#js--reset");
// Stopwatch, element which will show the stopwatch
var stopwatch = document.querySelector("#js--stopwatch");

// Global values to use for the stopwatch
var centiseconds = 0; // Each centisecond is 1 percent of a second
var seconds = 0;
var minutes = 0;

// Show an element on screen
function hide(element) {
  element.classList.add("display-none");
}

// Hide an element on screen
function show(element) {
  element.classList.remove("display-none");
}

// Toggle disable button
function disableButton(element, boolean) {
  if (boolean) {
    element.classList.add("button-disabled");
    element.disabled = true;
  } else {
    element.classList.remove("button-disabled");
    element.disabled = false;
  }
}

// Format and display the time on screen
function display(centiseconds, seconds, minutes) {
  var formattedCentiseconds = "";
  var formattedSeconds = "";
  var formattedMinutes = "";

  // Format centiseconds before shown on screen
  if (centiseconds < 10) {
    // If centiseconds are less than 10, add a zero before the centiseconds in string
    formattedCentiseconds = "0" + centiseconds.toString();
  } else {
    // Otherwise just show the centiseconds
    formattedCentiseconds = centiseconds.toString();
  }

  // Format seconds before shown on screen
  if (seconds < 10) {
    // If seconds are less than 10, add a zero before the seconds in string
    formattedSeconds = "0" + seconds.toString();
  } else {
    // Otherwise just show the seconds
    formattedSeconds = seconds.toString();
  }

  // Format minutes before shown on screen
  if (minutes < 10) {
    // If minutes are less than 10, add a zero before the minutes in string
    formattedMinutes = "0" + minutes.toString();
  } else {
    // Otherwise just show the minutes
    formattedMinutes = minutes.toString();
  }

  stopwatch.innerHTML =
    formattedMinutes + ":" + formattedSeconds + "." + formattedCentiseconds;
}

// Initialize and display the stopwatch
display(0, 0, 0);

// When start button clicked
// Users will only see this button if the stopwatch is stopped
startButton.addEventListener("click", function() {
  // Show and hide relevent buttons
  hide(startButton);
  disableButton(resetButton, true);
  show(stopButton);

  // Start the stopwatch, this function will every 0.1 seconds
  var stopwatch = setInterval(function() {
    // Increment miliseconds by one
    centiseconds = centiseconds + 1;

    // If miliseconds are equal to 100, reset the centiseconds and increment
    // seconds by one
    if (centiseconds === 100) {
      centiseconds = 0;
      seconds = seconds + 1;
    }

    // If seconds are equal to 60, reset the seconds and incement minutes by one
    if (seconds === 60) {
      seconds = 0;
      minutes = minutes + 1;
    }

    // Format and display the final time
    display(centiseconds, seconds, minutes);
  }, 10);

  // When stop button clicked
  // Users will only see this button if the stopwatch is running
  stopButton.addEventListener("click", function() {
    // Hide and show relevent buttons
    hide(stopButton);
    show(startButton);
    disableButton(resetButton, false);

    // Stop the stopwatch, the 'stopwatch' value passed on is the setInterval function
    clearInterval(stopwatch);
  });
});

// When reset button clicked
// Users will only see this button if the stopwatch has stopped after running
resetButton.addEventListener("click", function() {
  // Hide relevent buttons
  disableButton(resetButton, true);
  hide(stopButton);

  // Reset the time
  centiseconds = 0;
  seconds = 0;
  minutes = 0;

  // Display the time
  display(0, 0, 0);
});
