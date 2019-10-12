import controlledTimer from './controlledTimer'

window.addEventListener("load", () => {
    const timerEl = new controlledTimer({
      start: "00:23:59:57",
      end: "01:00:00:10",
      direction: "up",
      endMinuteControlCallback: () => { console.log("abc"); }
    });

    const killButton = document.querySelector("#controlledtimer-kill");
    const restartButton = document.querySelector("#controlledtimer-restart");
    const playPauseButton = document.querySelector("#controlledtimer-playpause");

    killButton.addEventListener("click", () => {
      timerEl.kill();
    });
    
    restartButton.addEventListener("click", () => {
      timerEl.restart();
    });

    playPauseButton.addEventListener("click", () => {
      timerEl.playPause();
    });
})