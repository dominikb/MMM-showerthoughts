Module.register('MMM-showerthoughts', {

  // Initial values
  quotes: [''],
  quoteIndex: 0,

  defaults: {
    // Time in SECONDS until quotes change on screen.
    viewUpdateInterval: 30,

    // Time in MINUTES until new quotes get polled from reddit.
    fetchInterval: 60,

    // Number of quotes, from top down, that will be used.
    quoteLimit: 20, 
  },

  start: function () {
    this.domUpdaterId = setInterval(
      this.updateDom,
      this.viewUpdateIntervalMs()
    );

    this.sendSocketNotification("SHOWERTHOUGHTS_FETCH", this.config);
    this.fetchIntervalId = setInterval(
      () => this.sendSocketNotification("SHOWERTHOUGHTS_FETCH", this.config),
      this.fetchIntervalMs()
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

  viewUpdateIntervalMs: function () {
    return this.config.viewUpdateInterval * 1000;
  },

  fetchIntervalMs: function() {
    return this.config.fetchInterval * 60 * 1000;
  },

})
