import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Header() {
  return (
    <div className='flex justify-between w-full items-center py-2 px-4 shadow-xl/25 rounded-full'>
      <div className='flex'>
        <div className='mx-1 text-red-400/90'>
          <FontAwesomeIcon icon="fa-solid fa-clock" />
        </div>
        <div>Pomo Zero</div>
      </div>
      <button className='bg-rose-900 px-4 py-1 mb-1 rounded-2xl shadow-sm/30'>Login</button>
    </div>
  )
}
