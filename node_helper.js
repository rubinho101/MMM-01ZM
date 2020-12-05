var NodeHelper = require("node_helper")
var getJSON = require('get-json');


module.exports = NodeHelper.create({
  start: function() {
    this.countDown = 10000000
  },
  socketNotificationReceived: function(notification, payload) {
    switch(notification) {
      case "DO_YOUR_JOB":
        this.sendSocketNotification("I_DID", (this.countDown - payload))
        break
    }
  },

  function getTemp() {
  getJSON('http://localhost:8000/?mac=58:2d:34:35:ad:00', 
  function(error, response) {
	  console.log(error);
    console.log(response);
    console.log("Room 1");
    }
    );
  }


})