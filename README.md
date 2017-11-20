# temperature-monitor

THIS IS A WIP

A personal project to give a complete solution to monitor the temperature of an environment, see temperature reports, setup a expected temperature range and receive and notifications when the temperature gets out of the desired range. It includes:

- a sensor (built with NodeMCU) that measures the temperature of its environment and sends it to an URL, using WiFi

- a server (built with NodeJS) that receives sensors data and provide them to users, as well as handles notifications

- a Telegram chat bot that displays sensors temperature reports, and allows users to setup valid temperature ranges for sensors, to receive alerts when the temperature measured by the sensor gets too high or too low

- [NOT IMPLEMENTED YET] a mobile app (built with React Native) that displays sensors temperature reports, and allows users to setup valid temperature ranges for sensors, to receive alerts when the temperature measured by the sensor gets too high or too low
