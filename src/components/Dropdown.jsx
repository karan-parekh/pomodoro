import React, { useState } from 'react'

export default function Dropdown(props) {
  const { children } = props
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)
  
  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          onClick={toggleDropdown}
          className='inline-flex justify-center w-full rounded-full cursor-pointer'
        >{children}</button>
      </div>
      {isOpen && (
        <div 
          className="origin-top-right absolute flex px-2 py-1
          right-0 mt-2 w-fit rounded-md shadow-lg text-sm text-red-400 bg-white"
          role="menu"
        >
          <div className='' role='none'>
            Logout
          </div>
        </div>
      )}
    </div>
  )
}
