import Button from '@/components/arduino/Button'
import LED from '@/components/arduino/LED'
import SerialPortOpen from '@/components/arduino/SerialPortOpen'
import React from 'react'

function page() {
  return (
    <>
      <SerialPortOpen />
      <div className="grid grid-cols-4 gap-3 w-full">
        <div className="flex flex-col w-full  h-[300px] justify-center items-center">
          <Button />
        </div>
        <div className="flex flex-col w-full  h-[300px] justify-center items-center">
          <LED name={'active led'} />
        </div>
      </div>
    </>
  )
}

export default page
