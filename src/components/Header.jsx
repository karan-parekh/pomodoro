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
        <div className="flex w-full items-center justify-between rounded-full px-4 py-2 shadow-xl/25">
            {loginModal && <LoginModal></LoginModal>}
            <div className="flex">
                <div className="mx-1 text-red-400/90">
                    <FontAwesomeIcon icon="fa-solid fa-clock" />
                </div>
                <div>Pomo Zero</div>
            </div>
            <UserSpace />
        </div>
    )
}

function UserSpace() {
    const user = useUserStore((state) => state.user)
    const setLoginModal = useUserStore((state) => state.setLoginModal)

    if (user) {
        return <Dropdown>{user}</Dropdown>
    } else {
        return (
            <button
                className="mb-1 cursor-pointer rounded-2xl bg-rose-900 px-4 py-1 shadow-sm/30"
                onClick={() => setLoginModal(true)}
            >
                Login
            </button>
        )
    }
}
