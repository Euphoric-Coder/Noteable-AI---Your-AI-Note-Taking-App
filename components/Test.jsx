'use client'

import React from 'react'
import { Button } from './ui/button'

const Test = () => {
    const awareness = () => {
        alert('Just creating awareness!')
    }
  return (
    <div>
        <Button onClick={awareness}>Test</Button>
    </div>
  )
}

export default Test