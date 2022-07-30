(function(){
  'use strict';

  var timer = document.getElementById('timer');
  var centerLine = document.getElementById('centerLine');
  var timerCU = document.getElementById('timerCU');
  var limit = document.getElementById('limit');
  var min = document.getElementById('min');
  var sec = document.getElementById('sec');
  var reset = document.getElementById('reset');
  var st = document.getElementById('st');
  var progressBar = document.getElementById('progressBar');
  var start = document.getElementById('start');
  // var qualifying = document.getElementById('qualifying');
  // var final = document.getElementById('final');

  var startTime;
  var timeLeft;
  var timeToCountDown = 0;
  var timerId;
  var isRunning = false;
  var limitTime = 0;
  var time;
  var val;

  function updateTimer(t){
    var d = new Date(t);
    var m = d.getMinutes();
    var s = d.getSeconds();
    var timerString;
    m = ('' + m).slice(-2);
    s = ('0' + s).slice(-2);

    timerString = m + ':' + s;

    if((t == limitTime)&&(isRunning == false)) {
      timer.textContent = timerString;
      centerLine.textContent = "";
      timerCU.textContent = "";
      limit.textContent = minANDsec(limitTime);
    } else if(t >= (limitTime - 3000)) {
      timer.textContent = "START";
      // centerLine.textContent = "│";
      timerCU.textContent = countUp(t);
    } else {
      timer.textContent = timerString;
      // centerLine.textContent = "│";
      timerCU.textContent = countUp(t);
    }

    // updateBar();

    // document.title = 'RoboconTimer　' + timerString;
  }

  function countDown() {
    timerId = setTimeout(function() {
      // var elapsedTime = Data.now() - startTime;
      // timeLeft = timeToCountDown - elapsedTime;
      timeLeft = timeToCountDown - (Date.now() - startTime);
      // console.log(timeLeft);
      if (timeLeft < 0) {
        isRunning = false;
        st.textContent = 'Start';
        start.style.borderColor = '';
        clearTimeout(timerId);
        timeLeft = 0;
        timeToCountDown = 0;
        updateTimer(timeLeft);
        return;
      }
      updateTimer(timeLeft);
      countDown();
    }, 10);
  }

  function countUp(t){
    time = limitTime - t;

    var d = new Date(time);
    var m = d.getMinutes();
    var s = d.getSeconds();
    var timerString;
    var timerCountUp;

    if(limitTime > time) s += 1;
    if (m >= 60) m = 0;
    if (s >= 60) {m += 1; s = 0;}

    m = ('' + m).slice(-2);
    s = ('0' + s).slice(-2);

    timerString = m + ':' + s;
    timerCountUp = "　 " + timerString;

    return timerCountUp;
  }

  function minANDsec(t) {
    var d = new Date(t);
    var m = d.getMinutes();
    var s = d.getSeconds();
    var timerString;
    m = ('' + m).slice(-2);
    s = ('0' + s).slice(-2);
    timerString = m + ':' + s;

    return timerString;
  }

  st.addEventListener('click', function() {
    if (isRunning === false) {
      isRunning = true;
      st.textContent = 'Stop';
      start.style.borderColor = 'red';
      start.style.borderLeft = '10px solid transparent';
      startTime = Date.now();
      countDown();
      timelineUpdate(`START -timer`);
    } else {
      isRunning = false;
      st.textContent = 'Start';
      start.style.borderColor = '';
      timeToCountDown = timeLeft;
      clearTimeout(timerId);
      timelineUpdate(`STOP -timer`);
    }
  });

  min.addEventListener('click', function() {
    if (isRunning === true) {
      return;
    }
    timeToCountDown = 2 * 60 * 1000 + 30 * 1000;
    // timeToCountDown += 1000;
    limitTime = timeToCountDown;
    if (timeToCountDown >= 60 * 60 * 1000) {
      timeToCountDown = 0;
    }
    updateTimer(timeToCountDown);
  });

  sec.addEventListener('click', function() {
    if (isRunning === true) {
      return;
    }
    timeToCountDown =  3 * 60 * 1000;
    limitTime = timeToCountDown;
    if (timeToCountDown >= 60 * 60 * 1000) {
      timeToCountDown = 0;
    }
    updateTimer(timeToCountDown);
  });

  reset.addEventListener('click', function() {
    timeToCountDown = 0;
    limitTime = 0;
    updateTimer(timeToCountDown);
    timelineUpdate(`RESET -timer`);
  });
})();


function updateBar() {
  val = time / limitTime * 100;
  progressBar.value = val;

}
