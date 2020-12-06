# MMM-01ZM

Since I got a couple of Xiaomi LYWSDCGQ 01ZM Temperature and Humidity sensors and I want to display the values on the MMM [MagicMirror2](https://magicmirror.builders/) without using the Gateway approach, so I created this MMM-01ZM module.

This module requires the [mitemp_bt](https://github.com/hassiweb/mitemp999) library:\
In */home/pi/MagicMirror/modules* create a new folder MMM-01ZM `git clone https://github.com/rubinho101/MMM-01ZM`\
`cd /home/pi/MagicMirror/modules/MMM-01ZM`\
`pip3 install bluepy`\
`pip3 install btlewrap`\
`git clone https://github.com/hassiweb/mitemp`\
Move the parseBLE01ZM.py file into the mitemp folder.

In */home/pi/MagicMirror/modules/MMM-01ZM/mitemp/mitemp_bt/mitemp_bt_poller.py* line 34 change `self._bt_interface = BluetoothInterface(backend, adapter)` to `self._bt_interface = BluetoothInterface(backend, adapter=adapter)`.

In addition, *parseBLE01ZM.py* needs Sanic the Python3 web server framework to interact with MMM:\
`pip3 install sanic`

The node_helper.js requires get-json library:\
`npm install get-json`

Next, add the MAC addresses of your 01ZM sensors to the node_helper.js array:\
`const rooms = ["your sensor mac 1", "your sensor mac 2", "your sensor mac 3"]`

Finally, add MMM-01ZM to the *config.js* file:
```
		{
			module: "MMM-01ZM",
			position: "upper_third"
		},
```

Before you start MMM run *parseBLE01ZM.py*.

Please be aware of the setInterval and setTimeout values in the *MMM-01ZM.js* and *node_helper.js* files.
This needs to be balanced based on the number of sensors you parse to avoid sending too many requests to the Raspi BLE component.

Hint: It takes about 45 seconds for the first two sensors to be displayed.

