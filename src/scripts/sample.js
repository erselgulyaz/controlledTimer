import controlledTimer from './controlledTimer'

window.addEventListener("load", () => {
    const timerEl = new controlledTimer({
      start: "00:56",
      end: "00:45",
      direction: "down"
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