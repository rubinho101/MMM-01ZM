#with the help of:
#https://www.instructables.com/A-Low-cost-IoT-Air-Quality-Monitor-Based-on-Raspbe/
from sds011 import *
import time
from datetime import datetime
sensor = SDS011("/dev/ttyUSB0", use_query_mode=True)
def get_data(n=3):
    sensor.sleep(sleep=False)
    pmt_2_5 = 0
    pmt_10 = 0
    time.sleep(10)
    for i in range (n):
        x = sensor.query()
        pmt_2_5 = pmt_2_5 + x[0]
        pmt_10 = pmt_10 + x[1]
        time.sleep(2)
    pmt_2_5 = round(pmt_2_5/n, 1)
    pmt_10 = round(pmt_10/n, 1)
    sensor.sleep(sleep=True)
    time.sleep(2)
    return pmt_2_5, pmt_10

def pmtcorrection(x_humidity):
    """
    Correction factor for low budget pm sensors data based on the research paper 'Developing a Relative Humidity Correction for Low-Cost Sensors Measuring
    Ambient Particulate Matter' by Di Antonio et al.
    k: the degree of hygroscopicity of a particle.
    x_humidity: relative humidity, provided by the sensor.

    """
    k = 0.6
    aw = x_humidity/100
    return (1 + ((k/1.65)/(-1 + (1/aw))))