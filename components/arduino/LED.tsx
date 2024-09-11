'use client'

import {ReadLEDState} from '@/actions/arduino'
import useEffectOnce from '@/lib/useEffectOnce'
import {cn} from '@/lib/utils'
import {useRef, useState} from 'react'

function LED({name}: {name: string}) {
  const [state, setState] = useState(false)
  const id = useRef<NodeJS.Timeout | undefined>(undefined)

  const handleClick = async () => {
    const ledState = (await ReadLEDState()) as boolean
    setState(ledState)
    console.log('Read LED state!')
  }

  // useEffectOnce(() => {
  //   id.current = setInterval(handleClick, 100)
  //   return () => {
  //     clearInterval(id.current)
  //   }
  // })

  return (
    <div
      className={cn(
        'w-[200px] h-[200px] rounded-full text-black flex items-center justify-center',
        state ? 'bg-green-300' : 'bg-white',
      )}
      onClick={handleClick}
    >
      {name}
    </div>
  )
}

export default LED
