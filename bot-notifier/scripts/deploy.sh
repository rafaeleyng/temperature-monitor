#!/bin/sh

APP_NAME=temperature-monitor-bot-notifier

now -y rm $APP_NAME

set -e
now --public --dotenv=.env -n $APP_NAME
