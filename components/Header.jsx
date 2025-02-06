import React from 'react'
import { UserButtonMenu } from './UserButton'

const Header = () => {
  return (
    <div className='flex justify-between items-center shadow-md p-5'>
      <p>Lorem ipsum dolor sit.</p>
      <UserButtonMenu />
    </div>
  )
}

export default Header