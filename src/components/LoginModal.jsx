import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useUserStore } from '../store'
import { ModalButton } from './TaskModal'

export default function LoginModal() {
  const setLoginModal = useUserStore((state) => state.setLoginModal)
  const setUser = useUserStore((state) => state.setUser)
  const [text, setText] = useState('')

  return (
    <div className="fixed inset-0 flex justify-center bg-black/50 items-center z-2">
      <div className="flex flex-col w-xs bg-red-400/90 justify-center p-4 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <p>Login</p>
          <FontAwesomeIcon 
            className="cursor-pointer"
            onClick={() => setLoginModal(false)} 
            icon="fa-solid fa-xmark"/>
        </div>
        <input 
          className="w-full inset-shadow-sm/30 rounded-md px-2 py-1 mb-2 focus:outline-0" 
          value={text} type="text" name="taskInput"
          placeholder="Name"
          onChange={e=>setText(e.target.value)}
        />
        <div className="flex flex-row-reverse justify-between items-center">
          <div className="flex justify-end">
            <ModalButton onClick={() => setLoginModal(false)}>Cancel</ModalButton>
            <ModalButton primary type="submit" onClick={() => {
              setUser(text)
              setLoginModal(false)
            }}>Done</ModalButton>
          </div>
        </div>
      </div>
    </div>
  )
}
