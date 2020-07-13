(function () {
  // Start button
  let startButton = document.querySelector("#js--start");
  // Stop button
  let stopButton = document.querySelector("#js--stop");
  // Reset button
  let resetButton = document.querySelector("#js--reset");
  // Stopwatch, the element which will show the time
  let stopwatch = document.querySelector("#js--stopwatch");

  // Global variables to use for the stopwatch
  let centiseconds = 0; // Each centisecond is 1 percent of a second
  let seconds = 0;
  let minutes = 0;

  // Show an element on the screen
  function hide(element) {
    element.classList.add("u-display-none");
  }

  // Hide an element on the screen
  function show(element) {
    element.classList.remove("u-display-none");
  }

  // Toggle disable attribute of an element
  function disable(element, boolean) {
    if (boolean) {
      element.disabled = true;
    } else {
      element.disabled = false;
    }
  }

  // Format and display the time on the screen
  function display(centiseconds, seconds, minutes) {
    var formattedCentiseconds = "";
    var formattedSeconds = "";
    var formattedMinutes = "";

    // Format centiseconds before shown on the screen
    if (centiseconds < 10) {
      // If centiseconds are less than 10, add a zero before the centiseconds in string
      formattedCentiseconds = "0" + centiseconds.toString();
    } else {
      // Otherwise just show the centiseconds
      formattedCentiseconds = centiseconds.toString();
    }

    // Format seconds before shown on the screen
    if (seconds < 10) {
      // If seconds are less than 10, add a zero before the seconds in string
      formattedSeconds = "0" + seconds.toString();
    } else {
      // Otherwise just show the seconds
      formattedSeconds = seconds.toString();
    }

    // Format minutes before shown on the screen
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

  // When start button gets clicked
  // Users can only see this button while the stopwatch is paused
  startButton.addEventListener("click", function () {
    // Change the buttons
    hide(startButton);
    show(stopButton);
    disable(resetButton, true);

    // Start the stopwatch, this function will run 100 times a second
    let stopwatch = setInterval(function () {
      // Increment centiseconds by one
      centiseconds = centiseconds + 1;

      // If centiseconds are equal to 100, reset the centiseconds and increment
      // seconds by one
      if (centiseconds === 100) {
        centiseconds = 0;
        seconds = seconds + 1;
      }

      // If seconds are equal to 60, reset the seconds and increment minutes by one
      if (seconds === 60) {
        seconds = 0;
        minutes = minutes + 1;
      }

      // Format and display the final time
      display(centiseconds, seconds, minutes);
    }, 10);

    // When stop button gets clicked
    // Users can only see this button while the stopwatch is running
    stopButton.addEventListener("click", function () {
      // Change the buttons
      hide(stopButton);
      show(startButton);
      disable(resetButton, false);

      // Stop the stopwatch, the 'stopwatch' value that gets passed on is the setInterval function
      clearInterval(stopwatch);
    });
  });

  // When reset button gets clicked
  // Users can only see this button if the stopwatch stops while running
  resetButton.addEventListener("click", function () {
    // Change the buttons
    hide(stopButton);
    disable(resetButton, true);

    // Reset the global variables
    centiseconds = 0;
    seconds = 0;
    minutes = 0;

    // Display the time
    display(0, 0, 0);
  });
})();
