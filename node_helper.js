const NodeHelper = require("node_helper");
const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = NodeHelper.create({
  start: function () {
    console.log(`Starting node helper for: ${this.name}`);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "SHOWERTHOUGHTS_FETCH") {
      this.config = payload;
      this.fetchShowerthoughts();
    }
  },

  fetchShowerthoughts: function () {
    fetch('https://old.reddit.com/r/Showerthoughts/top')
      .then(res => res.text())
      .then(body => {
        const $ = cheerio.load(body);

        const quotes = $('a.title')
          .map((_index, el) => $(el).text())
          .get();

        this.sendSocketNotification('SHOWERTHOUGHTS_RECEIVED', quotes);
      })
      .catch(e => {
        console.error(`${this.name}: Error fetching showerthoughts from reddit.`);
        console.error(e);
      });
  }
});
