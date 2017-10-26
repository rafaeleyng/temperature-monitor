#!/bin/sh

docker run --name temperature-monitor-reverse-proxy -p 80:80 -v $PWD/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx:1.13.5-alpine
