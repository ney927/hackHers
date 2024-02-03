const SerialPort = require('serialport').SerialPort;
// const Readline = require('@serialport/parser-readline');

const port = new SerialPort({
    path: 'COM3',
    baudRate: 57600,
})

// Open errors will be emitted as an error event
port.on('error', function(err) {
    console.log('Error: ', err.message)
})

  
// Read data that is available but keep the stream in "paused mode"
port.on('readable', function () {
    console.log('Data:', port.read())
})

// Switches the port into "flowing mode"
port.on('data', function (data) {
    console.log('Data:', data)
})

// Pipe the data into another stream (like a parser or standard out)
// const lineStream = port.pipe(new Readline())





// const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// parser.on('data', (data) => {
//   console.log(`Pico Data: ${data}`);
//   // Process the Raspberry Pi Pico data as needed in your Node.js application
// });

