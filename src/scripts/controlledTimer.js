class controlledTimer {
  constructor(options = {}) {

    this.mainControl = true;
    this.defaultInterval = null;
    this.sixtySecondCounter = 0;

    const defaults = {
      container: '#controlledtimer-container',
      selector: '#controlledtimer-selector',
      start: '00:58',
      end: '00:00',
      direction: 'down', /* up, down */
      endMinuteControl: false,
      endMinuteControlCallback: () => {},
      sixtySecondControl: false,
      sixtySecondControlCallback: () => {},
      startCallback: () => {},
      endCallback: () => {},
    };

    const extend = Object.assign(defaults, options);

    for ( const key in extend ) {
      if ( extend.hasOwnProperty(key) ) {
        this[key] = extend[key]
      }
    }
    
    this.rending();
    this.init();
  }/* constructor */

  init() {
    if ( document.querySelector(this.container) !== null ) {
      this.getTemplate();
      this.partyHard();
    }
  }

  getTemplate() {
    let template = "";
    const boxGroupCounter = this.time.split(":");

    for ( let i = 0; i < boxGroupCounter.length; i++ ) {
      template += this.getBoxGroup(boxGroupCounter[i]);
    }
    
    document.querySelector(this.selector).innerHTML = template;
  }

  getBoxGroup(p) {
    const els = p.split("");

    let template = `<div class="controlledtimer-box-group">`;

    for ( let i = 0; i < els.length; i++ ) {
      template += `<div class="controlledtimer-box-item">${els[i]}</div>`;
    }
    template += `</div>`;
    return template;
  }

  rending() {
    this.time = this.start;
    this.splitterCounter = this.start.split(":").length;
    this.second = this.start.split(":")[this.splitterCounter - 1];
    this.minute = this.start.split(":")[this.splitterCounter - 2];
    this.hour = this.start.split(":")[this.splitterCounter - 3];
    this.day = this.start.split(":")[this.splitterCounter - 4];
  }

  partyHard() {
    this.startCallback();
    if (this.sixtySecondControl) this.sixtySecondCounter = 0;
    this.defaultInterval = setInterval(() => {
      if ( this.mainControl ) {
        if (this.sixtySecondControl) {
          this.sixtySecondCounter++;
          if ( this.sixtySecondCounter === 60 ) {
            this.sixtySecondCounter = 0;
            this.sixtySecondControlCallback();
          }
        }
        
        if ( this.time !== this.end ) {
          if ( this.second >= 0 && this.second <= 59 && this.second !== undefined ) {
            this.secondActions();
          } else if ( this.minute >= 0 && this.minute <= 59 && this.minute !== undefined ) {
            this.minuteActions();
          } else if ( this.hour >= 0 && this.hour <= 24 && this.hour !== undefined ) {
            this.hourActions();
          } else if ( this.day >= 0 && this.day !== undefined ) {
            this.dayActions();
          } else {
            this.kill();
          }
          this.time = "";
          if(this.day !== undefined) this.time += `${this.day}:`;
          if(this.hour !== undefined) this.time += `${this.hour}:`;
          if(this.minute !== undefined) this.time += `${this.minute}:`;
          if(this.second !== undefined) this.time += `${this.second}`;
          this.getTemplate();
        } else {
          this.kill();
        }
      }
    }, 1000);
  }

  secondActions() {
    if (this.direction === "down") {
      this.second > 0 ? this.second-- : this.minuteActions();
    } else if (this.direction === "up") {
      this.second < 59 ? this.second++ : this.minuteActions();
    }
    if (this.second.toString().split("").length < 2) this.second = `0${this.second}`; 
    if (this.endMinuteControl) {
      if(this.direction === "down" && this.second === "00") this.endMinuteControlCallback();
      else if (this.direction === "up" && this.second === 59) this.endMinuteControlCallback();
    }
  }

  minuteActions() {
    if ( this.direction === "down" ) {
      if ( this.minute > 0 ) {
        this.minute--
        this.second = 59;
      } else {
        this.hourActions();
      }
    } else if ( this.direction === "up" ) {
      if ( this.minute < 59 ) {
        this.minute++
        this.second = `00`;
      } else {
        this.hourActions();
      }
    }
    if (this.minute.toString().split("").length < 2) this.minute = `0${this.minute}`; 
  }

  hourActions() {
    if ( this.direction === "down" ) {
      if ( this.hour > 0 ) {
        this.hour--;
        this.minute = 59;
        this.second = 59;
      } else {
        this.dayActions();
      }
    } else if ( this.direction === "up" ) {
      if ( this.hour < 23 ) {
        this.hour++;
        this.minute = `00`;
        this.second = `00`;
      } else {
        this.dayActions();
      }
    }
    if (this.hour.toString().split("").length < 2) this.hour = `0${this.hour}`; 
  }

  dayActions() {
    if ( this.direction === "down" ) {
      if ( this.day > 0 ) {
        this.day--;
        this.hour = 23;
        this.minute = 59;
        this.second = 59;
      } else {
        this.kill();
      }
    } else {
        this.day++;
        this.hour = `00`;
        this.minute = `00`;
        this.second = `00`;
    }
    if (this.day.toString().split("").length < 2) this.day = `0${this.day}`;
  }
  
  kill() {
    clearInterval(this.defaultInterval);
    this.defaultInterval = null;
    this.endCallback();
  }
  
  restart() {
    clearInterval(this.defaultInterval);
    this.rending();
    this.init();
  }

  playPause() {
    this.mainControl = !this.mainControl;
  }

}

export default controlledTimer;