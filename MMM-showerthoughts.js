Module.register('MMM-showerthoughts', {

  // Initial values
  quotes: [''],
  quoteIndex: 0,

  defaults: {
    // Time in seconds until quotes change on screen.
    viewUpdateInterval: 30 * 1000,

    // Time in seconds until new quotes get polled from reddit.
    fetchInterval: 60 * 60 * 1000,
    
    // Number of quotes, from top down, that will be used.
    quoteLimit: 20, 
  },

  start: function () {
    this.domUpdaterId = setInterval(
      this.updateDom,
      this.config.viewUpdateInterval
    );

    this.sendSocketNotification("SHOWERTHOUGHTS_FETCH", this.config);
    this.fetchIntervalId = setInterval(
      () => this.sendSocketNotification("SHOWERTHOUGHTS_FETCH", this.config),
      this.config.fetchInterval
    );
  },

  socketNotificationReceived: function (notification, payload) {
    if ('SHOWERTHOUGHTS_RECEIVED' === notification) {
      this.quotes = payload;
      this.updateDom();
    }
  },

  /* Rotate through quotes */
  getNextQuote: function() {
    this.quoteIndex = (this.quoteIndex + 1) % this.quotes.length;
    return this.quotes[this.quoteIndex];
  },

  getDom: function () {
    let element = document.createElement('div');
    element.innerHTML = this.getNextQuote();
    return element;
  },
})
