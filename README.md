# temperature-monitor

A personal project to provide a complete solution to monitor the temperature of an environment, see temperature reports, setup a expected temperature range and receive and notifications when the temperature gets out of the desired range. It includes:

- a [sensor](./sensor) (built with NodeMCU) that measures the temperature of its environment and sends it to an URL, using WiFi

- a [serverless API](./api) (built on top of AWS Lambda, API Gateway and DynamoDB) that receives sensors data and provide them to users, as well as handles notifications

- a Telegram chat bot [1](./bot) [2](./bot-notifier) that displays sensors temperature reports, and allows users to setup valid temperature ranges for sensors, to receive alerts when the temperature measured by the sensor gets too high or too low

- a [mobile app](./app) (built with React Native) that displays sensors temperature reports, and allows users to setup valid temperature ranges for sensors, to receive alerts when the temperature measured by the sensor gets too high or too low

This repository also contains configuration for a [reverse proxy](./reverse-proxy) that was needed to communicate the NodeMCU with AWS Lambda.

## Architecture

![cloudcraft](https://user-images.githubusercontent.com/4842605/33237530-be6521b6-d25c-11e7-83d5-ab5025bc21ed.png)
