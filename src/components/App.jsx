import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Body from './Body'

export default function App() {
  return (
    <div className='flex justify-center box-border size-full bg-linear-85 from-fuchsia-900 to-rose-500 text-white font-muse inset-0'>
      <div className='flex flex-col items-center w-xl'>
        <Header/>
        <Body/>
        <Footer/>
      </div>
    </div>
  )
}
