var NodeHelper = require("node_helper")
var getJSON = require('get-json');
var results = []
var pmResults = { PM25: 0, PM10: 0 }
const rooms = ["58:2d:34:35:ad:00"]
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

function getPM() {
  console.log("getPM"),
  getJSON('http://localhost:8000/pmdata',
  function(error, response){
    console.log(error);
    console.log(response);
    if (!error)
    pmResults = response
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
    getPM()
    roomParse()
    var t = rooms.length * 10000
    if (t < 60000)
        t = 60000
    setInterval(roomParse, t)
    setInterval(getPM, 90000)
  },
  socketNotificationReceived: function(notification, payload) {
    switch(notification) {
      case "DO_YOUR_JOB":
        this.sendSocketNotification("I_DID", {results, pmResults})
        break
    }
  },
})