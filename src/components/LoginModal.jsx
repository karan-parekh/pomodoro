import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useUserStore } from '../store'
import { ModalButton } from './TaskModal'

export default function LoginModal() {
    const setLoginModal = useUserStore((state) => state.setLoginModal)
    const setUser = useUserStore((state) => state.setUser)
    const [text, setText] = useState('')

    return (
        <div className="fixed inset-0 z-2 flex items-center justify-center bg-black/50">
            <div className="flex w-xs flex-col justify-center rounded-xl bg-red-400/90 p-4">
                <div className="mb-2 flex items-center justify-between">
                    <p>Login</p>
                    <FontAwesomeIcon
                        className="cursor-pointer"
                        onClick={() => setLoginModal(false)}
                        icon="fa-solid fa-xmark"
                    />
                </div>
                <input
                    className="mb-2 w-full rounded-md px-2 py-1 inset-shadow-sm/30 focus:outline-0"
                    value={text}
                    type="text"
                    name="taskInput"
                    placeholder="Name"
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="flex flex-row-reverse items-center justify-between">
                    <div className="flex justify-end">
                        <ModalButton onClick={() => setLoginModal(false)}>
                            Cancel
                        </ModalButton>
                        <ModalButton
                            primary
                            type="submit"
                            onClick={() => {
                                setUser(text)
                                setLoginModal(false)
                            }}
                        >
                            Done
                        </ModalButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
