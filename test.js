// create an empty modbus client
const ModbusRTU = require('modbus-serial')
const client = new ModbusRTU()

// open connection to a serial port
client.connectRTUBuffered('/dev/cu.usbserial-222210', {baudRate: 57600}, write)

async function write() {
  client.setID(1)

  client.writeCoil(1, true)
  await new Promise((resolve) => setTimeout(resolve, 500))
  client.writeCoil(1, false)
}
