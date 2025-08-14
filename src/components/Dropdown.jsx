import React, { useState } from 'react'
import { useUserStore } from '../store'

export default function Dropdown(props) {
    const { children } = props
    const [isOpen, setIsOpen] = useState(false)
    const setUser = useUserStore((state) => state.setUser)
    const toggleDropdown = () => setIsOpen(!isOpen)

    return (
        <div className="relative inline-block rounded-full bg-rose-900 px-2 py-1 text-left">
            <div>
                <button
                    onClick={toggleDropdown}
                    className="inline-flex w-full cursor-pointer justify-center rounded-full px-2"
                >
                    {children}
                </button>
            </div>
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 flex origin-top-right flex-col rounded-md bg-white px-2 py-1 text-red-400 shadow-lg"
                    role="menu"
                >
                    <button
                        onClick={() => setUser(null)}
                        className="cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}
