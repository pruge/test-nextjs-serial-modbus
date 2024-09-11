'use client'
import useEffectOnce from '@/lib/useEffectOnce'
import React, {useTransition} from 'react'
import {SerialPortOpen as SerialOpen} from '@/actions/arduino'

function SerialPortOpen() {
  const [, startTransition] = useTransition()
  useEffectOnce(() => {
    startTransition(SerialOpen)
  })

  return null
}

export default SerialPortOpen
