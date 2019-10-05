class controlledTimer {
  constructor(options = {}) {

    this.mainControl = true;
    this.defaultInterval = null;

    const defaults = {
      container: '#controlledtimer-container',
      selector: '#controlledtimer-selector',
      start: '00:58',
      end: '00:00',
      direction: 'down', /* up, down */
      startCallback: () => {
        console.log("start");
      },
      endCallback: () => {
        console.log("end");
      },
    };

    const extend = Object.assign(defaults, options);

    for ( const key in extend ) {
      if ( extend.hasOwnProperty(key) ) {
        this[key] = extend[key]
      }
    }

    this.firstTimeValues = extend;

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
    this.defaultInterval = setInterval(() => {
      console.log(this.defaultInterval);
      if ( this.mainControl ) {
        if ( this.time !== this.end ) {
          if ( this.second >= 0 && this.second < 59 && this.second !== undefined ) {
            this.secondActions();
          } else if ( this.minute >= 0 && this.minute < 59 && this.minute !== undefined ) {
            this.minuteActions();
          } else if ( this.hour >= 0 && this.hour < 24 && this.hour !== undefined ) {
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
    this.direction === "down" ? this.second-- : this.second++;
    if (this.second.toString().split("").length < 2) this.second = `0${this.second}`; 
  }

  minuteActions() {
    if ( this.direction === "down" ) {
      this.minute--
      this.second = 59;
    } else {
      this.minute++
      this.second = `00`;
    }
    if (this.minute.toString().split("").length < 2) this.minute = `0${this.minute}`; 
  }

  hourActions() {
    if ( this.direction === "down" ) {
      this.hour--;
      this.minute = 59;
      this.second = 59;
    } else {
      this.hour++;
      this.minute = `00`;
      this.second = `00`;
    }
    if (this.hour.toString().split("").length < 2) this.hour = `0${this.hour}`; 
  }

  dayActions() {
    if ( this.direction === "down" ) {
      this.day--;
      this.hour = 23;
      this.minute = 59;
      this.second = 59;
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
    // new controlledTimer(this.firstTimeValues);
    
    this.rending();

    this.init();
  }

  playPause() {
    this.mainControl = !this.mainControl;
  }

}

export default controlledTimer;