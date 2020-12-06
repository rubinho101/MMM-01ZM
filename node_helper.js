var NodeHelper = require("node_helper")
var getJSON = require('get-json');
var results = []
const rooms = ["58:2d:34:35:ad:00", "58:2d:34:35:ad:00", "58:2d:34:35:ad:00"]
function getRoom(index) {
    getJSON('http://localhost:8000/?mac='+rooms[index], 
    function(error, response) {
	    console.log(error);
        console.log(response);
        console.log("Room " + index);
        results[index] = response
    }
);
}

function roomParse() {
console.log("roomParse")
for (i=0; i < rooms.length; i++)
    setTimeout(getRoom.bind(null, i), i * 10000);
}


module.exports = NodeHelper.create({
  start: function() {
    roomParse()
    var t = rooms.length * 10000
    if (t < 60000)
        t = 60000
    setInterval(roomParse, t)
  },
  socketNotificationReceived: function(notification, payload) {
    switch(notification) {
      case "DO_YOUR_JOB":
        this.sendSocketNotification("I_DID", results)
        break
    }
  },
})