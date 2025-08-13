import React, { useState } from 'react'
import { useUserStore } from '../store'

export default function Dropdown(props) {
    const { children } = props
    const [isOpen, setIsOpen] = useState(false)
    const setUser = useUserStore((state) => state.setUser)
    const toggleDropdown = () => setIsOpen(!isOpen)

    return (
        <div className="relative inline-block text-left px-2 py-1 bg-rose-900 rounded-full">
            <div>
                <button
                    onClick={toggleDropdown}
                    className="px-2 inline-flex w-full cursor-pointer justify-center rounded-full"
                >
                    {children}
                </button>
            </div>
            {isOpen && (
                <div
                    className="flex-col absolute right-0 mt-2 flex w-fit origin-top-right rounded-md bg-white px-2 py-1 text-sm text-red-400 shadow-lg"
                    role="menu"
                >
                    <button onClick={() => setUser(null)} className='cursor-pointer'>
                        Logout
                    </button>
                    <div onClick={() => setUser(null)} className='cursor-pointer'>
                        Logout
                    </div>
                </div>
            )}
        </div>
    )
}
