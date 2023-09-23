#!/bin/bash
sudo rm -rf /var/www/html/app
sudo cp -r /home/ubuntu/app/ /var/www/html/
sudo rm -rf /var/www/html/index.nginx-debian.html

