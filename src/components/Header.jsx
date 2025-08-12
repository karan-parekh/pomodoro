import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import LoginModal from './LoginModal'
import { useUserStore } from '../store'
import Dropdown from './Dropdown'

export default function Header() {
  // const user = useUserStore((state) => state.user)
  const loginModal = useUserStore((state) => state.loginModal)
  // const setLoginModal = useUserStore((state) => state.setLoginModal)
  
  return (
    <div className='flex justify-between w-full items-center py-2 px-4 shadow-xl/25 rounded-full'>
      {loginModal && <LoginModal></LoginModal>}
      <div className='flex'>
        <div className='mx-1 text-red-400/90'>
          <FontAwesomeIcon icon="fa-solid fa-clock" />
        </div>
        <div>Pomo Zero</div>
      </div>
      <UserSpace/>
    </div>
  )
}

function UserSpace() {
  const user = useUserStore((state) => state.user)
  const setLoginModal = useUserStore((state) => state.setLoginModal)

  if (user) {
    return <Dropdown>{user}</Dropdown>
  } else { 
    return <button 
      className='bg-rose-900 px-4 py-1 mb-1 rounded-2xl shadow-sm/30 cursor-pointer'
      onClick={() => setLoginModal(true)}
    >Login</button>
  }
}
