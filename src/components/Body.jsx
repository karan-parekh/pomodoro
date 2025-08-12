import classNames from 'classnames'
import React, { useEffect } from 'react'
import TaskBoard from './TaskBoard'
import { useTimerStore } from '../store'

export default function Body() {
  return (
    <div className='flex flex-col w-full items-center'>
      <WatchFace/>
      <TaskBoard/>
    </div>
  )
}

function WatchFace () {
  const time = useTimerStore(state => state.time)
  const isStarted = useTimerStore(state => state.isStarted)
  const activeTimer = useTimerStore(state => state.activeTimer)
  const setIsStarted = useTimerStore(state => state.setIsStarted)
  const decrementTime = useTimerStore(state => state.decrementTime)

  useEffect(() => {
    if (!isStarted) return;
    if (time === 0) {
      setIsStarted(false)
      
    };

    const interval = setInterval(decrementTime, 1000);

    return () => clearInterval(interval);
  }, [isStarted, time, decrementTime, setIsStarted]);

  let label = 'Start'
  if (isStarted) label = 'Pause'
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const handleOnClick = () => {
    if (isStarted) {
      setIsStarted(false)
    } else {
      setIsStarted(true)
    }
  }

  return (
    <div className='bg-red-400/60 mt-6 shadow-xl/25 rounded-xl flex flex-col w-sm p-4 items-center'>
      <div className='flex justify-around w-full'>
        <WatchFaceButton selected={activeTimer === 1500} seconds={1500}>Pomodoro</WatchFaceButton>
        <WatchFaceButton selected={activeTimer === 300 } seconds={300} >Short Break</WatchFaceButton>
        <WatchFaceButton selected={activeTimer === 900 } seconds={900} >Long Break</WatchFaceButton>
      </div>
      <div className='flex justify-start text-shadow-lg/20 text-7xl p-6 m-2 font-fredoka'>
        <p>{`${padTime(minutes)}:${padTime(seconds)}`}</p>

      </div>
      <div>
        <button 
          className='text-2xl px-4 py-2 mb-4 cursor-pointer rounded-md bg-white text-rose-900 shadow-xl/20 hover:shadow-xl/40'
          onClick={handleOnClick}
        >
          {label}
        </button>
      </div>
    </div>
  )
}

function WatchFaceButton (props) {
  const { children, seconds, selected } = props
  const setTime = useTimerStore(state => state.setTime)
  const setIsStarted = useTimerStore(state => state.setIsStarted)
  const setActiveTimer = useTimerStore(state => state.setActiveTimer)

  const handleOnClick = (seconds) => {
    setTime(seconds)
    setIsStarted(false)
    setActiveTimer(seconds)
  }

  return (
    <button 
      onClick={() => handleOnClick(seconds)}
      className={ classNames(
        'px-3 py-1 rounded-md bg-transparent cursor-pointer', 
        {'bg-white text-rose-900 inset-shadow-sm/60 hover:inset-shadow-sm/90' : selected},
        {'inset-shadow-sm/30 hover:inset-shadow-sm/60': !selected}
      )}>
      {children}
    </button>
  )
}

function padTime(value) {
  return String(value).padStart(2, "0")
}