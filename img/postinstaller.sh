#!/bin/bash
# +----------------+
# | npm postinstall |
# +----------------+



git clone https://github.com/hassiweb/mitemp
pip3 install btlewrap
pip3 install bluepy
pip3 install sanic
mv ./parseBLE01ZM.py ./mitemp
sed -i "34 s/adapter/adapter=adapter/g" ./mitemp/mitemp_bt/mitemp_bt_poller.py
