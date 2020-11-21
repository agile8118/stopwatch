(function () {
  // Start button
  var startButton = document.querySelector("#js--start");
  // Stop button
  var stopButton = document.querySelector("#js--stop");
  // Reset button
  var resetButton = document.querySelector("#js--reset");
  // Stopwatch, the element which will show the time
  var stopwatch = document.querySelector("#js--stopwatch");

  // Variable to use for the stopwatch time
  var time = 0; // 78900 => centiseconds: 90 seconds: 18 minutes: 1

  // Show an element on the screen
  function hide(element) {
    element.classList.add("u-display-none");
  }

  // Hide an element on the screen
  function show(element) {
    element.classList.remove("u-display-none");
  }

  // Make an element disabled or enabled
  function disable(element, boolean) {
    if (boolean) {
      element.disabled = true;
    } else {
      element.disabled = false;
    }
  }

  // Format and display the time on the screen
  function display(time) {
    var centiseconds = Math.floor((time % 1000) / 10);
    var seconds = Math.floor(time / 1000) % 60;
    var minutes = Math.floor(Math.floor(time / 1000) / 60);

    // Format centisecond before shown on the screen
    if (centiseconds < 10) {
      // If centiseconds is less than 10, add a zero before the centiseconds in string
      centiseconds = "0" + centiseconds.toString();
    } else {
      // Otherwise just show the centiseconds
      centiseconds = centiseconds.toString();
    }

    // Format seconds before shown on the screen
    if (seconds < 10) {
      // If seconds is less than 10, add a zero before the seconds in string
      seconds = "0" + seconds.toString();
    } else {
      // Otherwise just show the seconds
      seconds = seconds.toString();
    }

    // Format minutes before shown on the screen
    if (minutes < 10) {
      // If minutes is less than 10, add a zero before the minutes in string
      minutes = "0" + minutes.toString();
    } else {
      // Otherwise just show the minutes
      minutes = minutes.toString();
    }

    // Update the UI
    stopwatch.innerHTML = minutes + ":" + seconds + "." + centiseconds;
  }

  display(0);

  var stopwatchTimerId;

  // When the start button gets clicked.
  // Users can only see this button whenever the stopwatch is NOT running
  startButton.addEventListener("click", function () {
    hide(startButton);
    show(stopButton);
    disable(resetButton, true);

    /* 
      // This is how to start a worker and send and receive data from it:
      if (window.Worker) {
        timer = new Worker("timer.js");
        timer.postMessage({
          centiseconds: centiseconds,
          seconds: seconds,
          minutes: minutes,
        });
        timer.onmessage = function (e) {
          // Format and display the final time
          centiseconds = e.data.centiseconds;
          seconds = e.data.seconds;
          minutes = e.data.minutes;
          display(minutes, seconds, centiseconds);
        };
      }
    */

    var startTime = new Date(),
      currentTime,
      actualTime,
      toAdd = 0;

    stopwatchTimerId = setInterval(function () {
      currentTime = new Date();
      actualTime = currentTime - startTime + toAdd;

      // Increment our time variable by 10ms (1 centisecond) at each interval
      time = time + 10;

      if (actualTime - time !== 0) {
        if (actualTime - time < -10) {
          // We'll run this after we had a pause
          toAdd = time - actualTime;
        } else {
          time = actualTime;
        }
      }

      display(time);
    }, 10);
  });

  // When the stop button gets clicked.
  // Users can only see this button while the stopwatch is running
  stopButton.addEventListener("click", function () {
    hide(stopButton);
    show(startButton);
    disable(resetButton, false);

    /* 
      // This is how we can terminate a worker:
      if (timer) {
        timer.terminate();
        timer = null;
      }
    */

    if (stopwatchTimerId) clearInterval(stopwatchTimerId);
  });

  // When the reset button gets clicked.
  // Users can only see this button if the stopwatch is stopped and has a value
  resetButton.addEventListener("click", function () {
    disable(resetButton, true);

    // Reset the timer value
    time = 0;

    display(0);
  });
})();
