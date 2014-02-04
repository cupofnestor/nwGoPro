#!/bin/bash
echo "compressing Resources..."
cd Resources
zip -r ../app.nw *
cd ../
killall node-webkit
open app.nw
