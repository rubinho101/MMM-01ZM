var getJSON = require('get-json');

 
function roomOne() {
    getJSON('http://localhost:8000/?mac=58:2d:34:35:ad:00', 
    function(error, response) {
	    console.log(error);
        console.log(response);
        console.log("Room 1");
    }
);    
}

function roomTwo() {
    getJSON('http://localhost:8000/?mac=58:2d:34:35:ad:00', 
    function(error, response) {
	    console.log(error);
        console.log(response);
        console.log("Room 2");
    }
);    
}

function roomThree() {
    getJSON('http://localhost:8000/?mac=58:2d:34:35:ad:00', 
    function(error, response) {
	    console.log(error);
        console.log(response);
        console.log("Room 3");
    }
);    
}

function roomParse() {
setTimeout(roomOne, 1);
setTimeout(roomTwo, 10000);
setTimeout(roomThree, 20000);
}

roomParse()
setInterval(roomParse, 60000)