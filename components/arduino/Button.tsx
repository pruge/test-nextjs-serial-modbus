'use client'

import {Button} from '../ui/button'
import {ButtonClick} from '@/actions/arduino'

function ArduinoButton() {
  // const [, startTransition] = useTransition()

  const handleClick = async () => {
    await ButtonClick()
    console.log('Button Click!')
  }

  return (
    <Button className="w-[200px] h-[200px]" onClick={handleClick}>
      button
    </Button>
  )
}

export default ArduinoButton
