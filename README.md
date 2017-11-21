# temperature-monitor

THIS IS A WIP

A personal project to give a complete solution to monitor the temperature of an environment, see temperature reports, setup a expected temperature range and receive and notifications when the temperature gets out of the desired range. It includes:

- a [sensor](./sensor/README.md) (built with NodeMCU) that measures the temperature of its environment and sends it to an URL, using WiFi

- a [serverless API](./api/README.md) (built on top of AWS Lambda, API Gateway and DynamoDB) that receives sensors data and provide them to users, as well as handles notifications

- a Telegram chat bot [1](./bot/README.md) [2](./bot-notifier/README.md) that displays sensors temperature reports, and allows users to setup valid temperature ranges for sensors, to receive alerts when the temperature measured by the sensor gets too high or too low

- [NOT IMPLEMENTED YET] a mobile app (built with React Native) that displays sensors temperature reports, and allows users to setup valid temperature ranges for sensors, to receive alerts when the temperature measured by the sensor gets too high or too low

This repository also contains configuration for a [reverse proxy](./reverse-proxy/README.md) that was needed to communicate the NodeMCU with AWS Lambda.
