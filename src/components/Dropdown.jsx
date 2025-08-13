import React, { useState } from 'react'

export default function Dropdown(props) {
    const { children } = props
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => setIsOpen(!isOpen)

    return (
        <div className="relative inline-block text-left px-2 py-1 bg-rose-900 rounded-full">
            <div>
                <button
                    onClick={toggleDropdown}
                    className="inline-flex w-full cursor-pointer justify-center rounded-full"
                >
                    {children}
                </button>
            </div>
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 flex w-fit origin-top-right rounded-md bg-white px-2 py-1 text-sm text-red-400 shadow-lg"
                    role="menu"
                >
                    <div className="" role="none">
                        Logout
                    </div>
                </div>
            )}
        </div>
    )
}
