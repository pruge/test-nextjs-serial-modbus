'use server'

import {clear} from 'console'
import ModbusRTU from 'modbus-serial'
const client = new ModbusRTU()
let isOpened = false
client.on('error', (err) => {
  // console.error('======================')
  // isOpened = false
})

// TODO scan polling
let LBIT: boolean[] = []
let timeoutCount = 0
let timeoutIntervalID: NodeJS.Timeout | undefined = undefined
let timeoutCountID: NodeJS.Timeout | undefined = undefined

async function Scan() {
  const state = await client.readCoils(0, 6)
  LBIT = state.data
}

export async function SerialPortOpen() {
  if (!isOpened) {
    client.setTimeout(1000)
    await client
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      .connectRTUBuffered('/dev/cu.usbserial-222210', {baudRate: 57600, lock: false})
      .then(() => {
        console.log('Serial port open')
        isOpened = true
        clearInterval(timeoutIntervalID)
        timeoutIntervalID = setInterval(async () => {
          await ModbusRequest(Scan)
        }, 50)
      })
      .catch((e) => {
        console.log('Serial port error')
        isOpened = false
        // client.destroy(() => {})
      })
  }
}

async function ModbusRequest(request: () => unknown, defaultValue?: unknown) {
  try {
    !isOpened && (await SerialPortOpen())

    return await request()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // console.log('===========================')
    if (e.errno && e.errno == 'ETIMEDOUT') {
      timeoutCount++
      clearTimeout(timeoutCountID)
      timeoutCountID = setTimeout(() => {
        timeoutCount = 0
      }, 50 * 10)
    }

    if (timeoutCount > 10 || (e.errno && e.errno !== 'ETIMEDOUT')) {
      timeoutCount = 0
      client.close(async () => {
        isOpened = false
        await SerialPortOpen()
      })
    }
    return defaultValue
  }
}

export async function ButtonClick() {
  console.log('Button Click!')

  ModbusRequest(async () => {
    client.setID(1)
    await client.writeCoil(1, true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    await client.writeCoil(1, false)
  })
}

export async function ReadLEDState() {
  console.log('Read Active Led state', LBIT[0])

  return ModbusRequest(async () => {
    return LBIT[0]
  }, false)
}
