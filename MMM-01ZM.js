//var getJSON = require('get-json');

Module.register("MMM-01ZM", {
    defaults: {
        foo: "°C"
      },
      start: function (){
        this.temperatur = ""
        var timer = setInterval(()=>{
          this.updateDom()
        }, 10000)
      },
      getDom: function() {
        var element = document.createElement("div")
        element.className = "myContent"
        element.innerHTML = "Temperature " + "BLEtemp " + this.config.foo
        //var subElement = document.createElement("p")
        //subElement.id = "COUNT"
        //element.appendChild(subElement)
        return element
      },
      
      notificationReceived: function(notification, payload, sender) {
        switch(notification) {
          case "DOM_OBJECTS_CREATED":
            var timer = setInterval(()=>{
              this.sendSocketNotification("DO_YOUR_JOB", this.count)
              this.count++
            }, 1000)
            break
        }
      },
      
      socketNotificationReceived: function(notification, payload) {
        switch(notification) {
          case "I_DID":
            var elem = document.getElementById("COUNT")
            elem.innerHTML = "Count:" + payload
            break
        }
      },
  })