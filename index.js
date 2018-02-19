var TimerApp = (function() {
  var SOUND_ALARM = "SOUND_ALARM";
  var INTERVAL = 1000 * 60 * 15;
  var INTERVAL_OFFSET = 1000 * 60 * 2;

  var state = 0;
  var nextRing = 0;

  var $ = function(id) {
    return document.getElementById(id);
  };
  
  var $stopSound = $("timer__stop-sound");
  var $playSound = $("timer__play-sound");
  var $debugInfo = $("timer__debug-info");

  var updateNextRing = function() {
    nextRing = Math.ceil(new Date() / INTERVAL) * INTERVAL + INTERVAL_OFFSET;
    updateDebugInfo();
  }
  
  var updateDebugInfo = function() {
    $debugInfo.textContent = "state=" + state + ";nextRing=" + new Date(nextRing) + ";";
  }

  var ring = function() {
    updateNextRing();
    if (state === 0 || state === 1) {
      state = 1;
      createjs.Sound.play(SOUND_ALARM);
    } else {
      state = 0;
    }
    updateState();
  };

  var stopSoundClick = function() {
    if (state === 1) {
      state = 0;
      createjs.Sound.stop();
    } else {
      state = -1;
    }
    updateState();
  };

  var playSoundClick = function() {
    ring();
  };

  var updateState = function() {
    switch (state) {
      case -1:
        $stopSound.style.display = "none";
        $playSound.style.display = "block";
        break;
      case 0:
        $stopSound.style.display = "block";
        $playSound.style.display = "block";
        break;
      case 1:
        $stopSound.style.display = "block";
        $playSound.style.display = "none";
        break;
    }
    updateDebugInfo();
  }
  
  updateNextRing();

  createjs.Sound.registerSound("alarm.mp3", SOUND_ALARM);
  
  setInterval(() => {
    if (new Date() > nextRing) ring();
  }, 50);

  $stopSound.addEventListener("click", stopSoundClick);
  $playSound.addEventListener("click", playSoundClick);

  return {
    ring: ring
  };
}());