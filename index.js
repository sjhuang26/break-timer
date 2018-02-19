var TimerApp = (function() {
  var SOUND_ALARM = "SOUND_ALARM";
  var INTERVAL = 1000 * 60 * 15;

  var $ = function(id) {
    return document.getElementById(id);
  };
  
  var $stopSound = $("timer__stop-sound");
  
  var ring = function() {
    createjs.Sound.play(SOUND_ALARM);
    $stopSound.style.display = "block";
  };

  var stopSoundClick = function() {
    createjs.Sound.stop();
    $stopSound.style.display = "none";
  };
  
  createjs.Sound.registerSound("alarm.mp3", SOUND_ALARM);
  
  $stopSound.style.display = "none";

  setTimeout(function() {
    ring();
    setInterval(ring, INTERVAL);
  }, INTERVAL - (new Date() % INTERVAL));

  $stopSound.addEventListener("click", stopSoundClick);

  return {
    ring: ring
  };
}());