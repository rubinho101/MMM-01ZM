Module.register("MMM-01ZM", {
  defaults: {},
  start: function (){
    this.results = []
    this.pmResults = { PM25: 0, PM10: 0 }
    var timer = setInterval(()=>{
      this.updateDom()
     }, 20000)
    },
    getDom: function() {
      var element = document.createElement("div")
      element.className = "myContent"
      var html = ""
      var html2 = ""
      for (i = 0; i < this.results.length; i++)
        html = html + "Room "+(i+1)+": " + "Temperature " + this.results[i].Temperature + " °C, " + "Humidity " + this.results[i].Humidity + " % " + "<br>"
      if (this.pmResults.PM25 > 0 && this.results[0]){ //check if there are sensor values
        if (this.results[0].Humidity >= 38) { //check if local relative humidity is above 38 and correct if applicable
          this.pmResults.PM25 = (this.pmResults.PM25/pmCor(this.results[0].Humidity)).toFixed(2)
          this.pmResults.PM10 = (this.pmResults.PM10/pmCor(this.results[0].Humidity)).toFixed(2)
        }
        html2 = "PM2.5: " + this.pmResults.PM25 + " µg/m3, " + "PM10: " + this.pmResults.PM10 + " µg/m3"
      }
      element.innerHTML = html + html2
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
          this.results = payload.results
          this.pmResults = payload.pmResults
          console.log(this.results)
          break
      }
    },
})

//Particulate Matter (PM) Correction function based on "Developing a Relative Humidity 
//Correction for Low-Cost Sensors Measuring Ambient Particulate Matter" by Di Antonio et al., 2018
// k (kappa): Degree of hygroscopicity of a particle, dependent on particle composition
// aw: Water activity based on relative humidity (RH)
function pmCor(Humidity) {
  var k = 0.5
  var aw = Humidity/100
  var result = (1 + ((k/1.65)/(-1 + (1/aw))))
  console.log(result)
  return result
}