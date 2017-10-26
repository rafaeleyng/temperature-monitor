#!/bin/sh

docker run --name temperature-monitor-reverse-proxy -p 8080:8080 -v $PWD/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx:1.13.5-alpine
