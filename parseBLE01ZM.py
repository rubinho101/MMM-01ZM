
#!/usr/bin/env python3


from btlewrap import available_backends, BluepyBackend, GatttoolBackend, PygattBackend
from mitemp_bt.mitemp_bt_poller import MiTempBtPoller, \
    MI_TEMPERATURE, MI_HUMIDITY, MI_BATTERY
from datetime import datetime
from time import sleep
from sanic import Sanic
from sanic.response import json
#from urllib.parse import urlparse

now = datetime.now()

dt_string = now.strftime("%d/%m %H:%M:%S")
backend = BluepyBackend
app = Sanic()
@app.route('/')
async def poll(request):
    """Get the Sensor MAC as defined in the javascript file and poll data from the sensor once its invoked"""
    mac = request.args.get('mac', 0)
    poller = MiTempBtPoller(mac, backend)
    #query = urlparse(self.path).query
    #query_mac = dict(qc.split("=") for qc in query.split("&"))
    #mac_test = query_mac("mac")
    print("Parsing data")
    print("FW: {}".format(poller.firmware_version()))
    print("Name: {}".format(poller.name()))
    print("Battery: {}".format(poller.parameter_value(MI_BATTERY)))
    print("Temperature: {}".format(poller.parameter_value(MI_TEMPERATURE)))
    print("Humidity: {}".format(poller.parameter_value(MI_HUMIDITY)))
    with open('/home/pi/file.txt', 'a') as myfile:
        myfile.write("Time: {}; Battery: {}; Temp: {}; Humidity: {} /".format(datetime.now(), poller.parameter_value(MI_BATTERY), poller.parameter_value(MI_TEMPERATURE), \
        poller.parameter_value(MI_HUMIDITY)))
    return json({'Temperature': poller.parameter_value(MI_TEMPERATURE), 'Humidity': poller.parameter_value(MI_HUMIDITY), 'Mac': mac})
        #sleep(10)



print("datetime =", dt_string)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port = 8000)