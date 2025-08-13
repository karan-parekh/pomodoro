import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Body from './Body'

export default function App() {
    return (
        <div className="font-muse inset-0 box-border flex sm:text-lg min-h-screen min-w-screen justify-center bg-linear-85 from-fuchsia-900 to-rose-500 text-white">
            <div className="flex flex-col justify-items-center w-[90%] sm:w-[60%]">
                <Header />
                <Body />
                <Footer />
            </div>
        </div>
    )
}
