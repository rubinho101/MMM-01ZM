# MMM-01ZM

Since I got a couple of Xiaomi LYWSDCGQ 01ZM Temperature and Humidity sensors and I want to display the values on the [MagicMirror2](https://magicmirror.builders/) without using the Gateway approach, I created this MMM-01ZM module.

This module requires the mitemp_bt https://github.com/hassiweb/mitemp library:__
In /home/pi/MagicMirror/modules create a new folder MMM-01ZM.__
`cd /home/pi/MagicMirror/modules/MMM-01ZM`__
`pip3 install bluepy`__
`pip3 install btlewrap`__
`git clone https://github.com/hassiweb/mitemp`__
Move the parseBLE01ZM.py file into the mitemp folder

In addition, parseBLE01ZM.py needs Sanic the Python3 web server framework to interact with MMM:__
`pip3 install sanic`

The node_helper.js requires get-json library:__
`npm install get-json`

Next, add the MAC addresses of your 01ZM sensors to the node_helper.js array:__
`const rooms = ["your sensor mac 1", "your sensor mac 2", "your sensor mac 3"]`

Finally, add MMM-01ZM to the config.js file:
```
		{
			module: "MMM-01ZM",
			position: "upper_third"
		},
```

Please be aware of the setInterval and setTimeout values in the MMM-01ZM.js and node_helper.js files.
This needs to be balanced based on the number of sensors you parse to avoid sending too many requests to the Raspi BLE component.



