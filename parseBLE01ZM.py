
#!/usr/bin/env python3

#python3 function based on mitemp and sanic
#set up a sanic server, read the mac adress from xiaomi 01ZM sensors and return the values as json to MMM

from btlewrap import available_backends, BluepyBackend, GatttoolBackend, PygattBackend
from mitemp_bt.mitemp_bt_poller import MiTempBtPoller, \
    MI_TEMPERATURE, MI_HUMIDITY, MI_BATTERY
from datetime import datetime
from time import sleep
from sanic import Sanic
from sanic.response import json

now = datetime.now()

dt_string = now.strftime("%d/%m %H:%M:%S")
backend = BluepyBackend
app = Sanic()
@app.route('/')
async def poll(request):
    """Get the Sensor MAC as defined in the node_helper.js file, parse data from the sensor and return it as json to MMM"""
    mac = request.args.get('mac', 0)
    poller = MiTempBtPoller(mac, backend)
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




print("datetime =", dt_string)

#run the server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port = 8000)