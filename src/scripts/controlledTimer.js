class controlledTimer {
  constructor(options = {}) {
    const defaults = {
      parameter : "1",
      fnCallback: () => {

      }
    };

    const extend = Object.assign(defaults, options);

    for ( const key in extend ) {
      if ( extend.hasOwnProperty(key) ) {
        this[key] = extend[key]
      }
    }

    this.init();
  }/* constructor */

  init() {
  }

}

export default controlledTimer;