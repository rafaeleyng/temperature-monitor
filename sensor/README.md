# temperature-monitor - the sensor

---

<small>
Disclaimer:

I know **close to zero** about things like electronics and electricity. A lot of what I did in this part was based on tutorials, figuring stuff out, and trial-and-error.

*But it does work*.
</small>
---

## how it looks

![img_20171017_224557912_hdr](https://user-images.githubusercontent.com/4842605/31696872-e131ec80-b392-11e7-90b3-d6a3a7566db8.jpg)

![img_20171017_224725724_hdr](https://user-images.githubusercontent.com/4842605/31696894-08c37fde-b393-11e7-903a-24db8dd9a025.jpg)


## components I used

- 1 [NodeMCU 1.0](https://user-images.githubusercontent.com/4842605/31697243-15d29618-b395-11e7-98aa-4f5351f0bc0f.png)

- 1 [breadboard](https://user-images.githubusercontent.com/4842605/31697035-d532b6e8-b393-11e7-81eb-6ecbd66f031d.png)

- 3 [male-to-female jumper wires](https://user-images.githubusercontent.com/4842605/31697005-9e4aa7b2-b393-11e7-9318-8eb88817c8da.png)

- 1 [10k ohms resistor](https://user-images.githubusercontent.com/4842605/31697087-22e356fe-b394-11e7-866c-82ec6d0fffb1.png)

- 1 [103 (10k ohms) NTC thermistor](https://user-images.githubusercontent.com/4842605/31697194-d3000122-b394-11e7-96ad-3263bc48b2a0.png)

- 1 [micro usb cable](https://user-images.githubusercontent.com/4842605/31697137-73fd8d48-b394-11e7-8ba5-0550799d2d58.png)


## the circuit

The temperature sensor I built based on [this tutorial on how to build a temperature sensor for Arduino](http://www.circuitbasics.com/arduino-thermistor-temperature-sensor-tutorial/) (NodeMCU and Arduino seem to be somewhat similar, despite you can read everywhere they are "equal" or "compatible" - that is bullshit, in several levels).

The circuit is like this:

![image](https://user-images.githubusercontent.com/4842605/31697355-d3e8f7d2-b395-11e7-97aa-92ed6dc25040.png)

with the following observations:

- instead of an Arduino Uno, I used a NodeMCU board

- instead of 100K thermistor and resistor, I used 10k

- in the picture above, the red cable is going from the 5v pin in Arduino (we can't read the 5v label because the cable is hiding it) to the thermistor. Instead, we connect it to the 3.3v pin in NodeMCU (the purple wire, in my setup).

- comparing the picture above with the photo of my setup, this is the wires equivalence: red -> purple (pin 3.3v), black -> blue (pin GND - that means *ground*), blue -> green (pin A0, that means *analog 0*).


## the setup

- I had to use a Windows machine, couldn't make Arduino IDE recognize the NodeMCU in Mac (not even following the tips from [this issue](https://github.com/esp8266/Arduino/issues/732#issuecomment-336437977)).

- install Arduino IDE and the plugin for NodeMCU. On Tools > Board, select NodeMCU 1.0

- plug the NodeMCU board in the PC with the micro USB cable, select the port in Tools > Port and upload the code in the `sensor` file in this folder
