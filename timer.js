/* 
  This file is here for reference. We're not using it in the app.
 */

this.onmessage = function (e) {
  var centiseconds = e.data.centiseconds;
  var seconds = e.data.seconds;
  var minutes = e.data.minutes;

  // Start the stopwatch, this function will run 100 times a second
  setInterval(function () {
    // Increment centiseconds by one
    centiseconds = centiseconds + 1;
    // If centiseconds is equal to 100, reset the centiseconds and increment seconds by one
    if (centiseconds === 100) {
      centiseconds = 0;
      seconds = seconds + 1;
    }
    // If seconds is equal to 60, reset the seconds and increment minutes by one
    if (seconds === 60) {
      seconds = 0;
      minutes = minutes + 1;
    }
    this.postMessage({
      centiseconds: centiseconds,
      seconds: seconds,
      minutes: minutes,
    });
  }, 10);
};
