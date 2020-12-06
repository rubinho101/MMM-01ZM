 
Module.register("MMM-01ZM", {
  defaults: {},
    start: function (){
      this.results = []
      var timer = setInterval(()=>{
        this.updateDom()
      }, 20000)
    },
    getDom: function() {
      var element = document.createElement("div")
      element.className = "myContent"
      var html = ""
      for (i = 0; i < this.results.length; i++)
        html = html + "Room "+(i+1)+": " + this.results[i].Temperature + " °C " + this.results[i].Humidity + " % " + "<br>"
      element.innerHTML = html
      return element
    },
    
    notificationReceived: function(notification, payload, sender) {
      switch(notification) {
        case "DOM_OBJECTS_CREATED":
          var timer = setInterval(()=>{
            this.sendSocketNotification("DO_YOUR_JOB")
          }, 20000)
          break
      }
    },
    
    socketNotificationReceived: function(notification, payload) {
      switch(notification) {
        case "I_DID":
          console.log(payload)
          this.results = payload
          console.log(this.results)
          break
      }
    },
})