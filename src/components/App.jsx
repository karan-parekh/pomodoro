// import './App.css'
import { useEffect, useState } from 'react'
import TaskBoard from './Tasks'
import { useTimerStore } from '../store'
import { useTaskStore } from '../store'

export default function App() {
  return (
    <div className='app'>
      <Assort></Assort>
      <TaskBoard></TaskBoard>
    </div>
  )
}

function Assort() {
  const time = useTimerStore(state => state.time)
  const setTime = useTimerStore(state => state.setTime)
  const setIsStarted = useTimerStore(state => state.setIsStarted)
  const currentTask = useTaskStore(state => state.currentTask)

  const handleOnClick = (seconds) => {
    setTime(seconds)
    setIsStarted(false)
  }
  
  return (
    <div className='assort'>
      <div className='header'>
        {/* <button className={selectedTimer === 1500 ? 'highlight-timer' : ''} onClick={() => { */}
        <button className='highlight-timer' onClick={() => handleOnClick(1500)}>Pomodoro</button>
        <button className={time === 300 ? 'highlight-timer' : ''} onClick={() => handleOnClick(300)}>Short Break</button>
        <button className={time === 900 ? 'highlight-timer' : ''} onClick={() => handleOnClick(900)}>Long Break</button>
      </div>
      <CountdownTimer/>
      <p>{currentTask !== null ? currentTask.title : 'No task selected'}</p>
    </div>
  )
}

function CountdownTimer() {
  const time = useTimerStore(state => state.time)
  const decrementTime = useTimerStore(state => state.decrementTime)
  const setIsStarted = useTimerStore(state => state.setIsStarted)
  const isStarted = useTimerStore(state => state.isStarted)

  useEffect(() => {
    if (!isStarted) return;
    if (time === 0) setIsStarted(false);

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
    <div className='count-down-timer'>
      <p>{`${padTime(minutes)}:${padTime(seconds)}`}</p>
      <button onClick={handleOnClick}>{label}</button>
    </div>
  )
}


function padTime(value) {
    return String(value).padStart(2, "0")
}
