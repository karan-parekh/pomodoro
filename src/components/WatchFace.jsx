import classNames from 'classnames'
import { useEffect } from 'react'
import { useTaskStore, useTimerStore } from '../store'
import { POMO_TIME, S_BREAK, L_BREAK } from '../store'

function WatchFace() {
    const time = useTimerStore((state) => state.time)
    const isStarted = useTimerStore((state) => state.isStarted)
    const activeTimer = useTimerStore((state) => state.activeTimer)
    const setIsStarted = useTimerStore((state) => state.setIsStarted)
    const decrementTime = useTimerStore((state) => state.decrementTime)

    const currentTask = useTaskStore((state) => state.currentTask)
    const incrementTaskPomo = useTaskStore((state) => state.incrementTaskPomo)
    const incrementTotalPomo = useTaskStore((state) => state.incrementTotalPomo)

    useEffect(() => {
        if (!isStarted) return
        if (time === 0) {
            setIsStarted(false)
            if (activeTimer === POMO_TIME) {
                incrementTotalPomo()
                if (currentTask) incrementTaskPomo(currentTask.id)
            }
        }

        const interval = setInterval(decrementTime, 1000)

        return () => clearInterval(interval)
    }, [
        isStarted,
        time,
        decrementTime,
        setIsStarted,
        incrementTaskPomo,
        currentTask,
        activeTimer,
        incrementTotalPomo,
    ])

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
        <div className="mt-4 flex w-full flex-col items-center rounded-xl bg-red-400/60 p-4 shadow-xl/25 sm:mt-6 sm:w-md">
            <div className="flex w-full justify-between gap-4">
                <WatchFaceButton
                    selected={activeTimer === POMO_TIME}
                    seconds={POMO_TIME}
                >
                    Focus Time
                </WatchFaceButton>
                <WatchFaceButton
                    selected={activeTimer === S_BREAK}
                    seconds={S_BREAK}
                >
                    Short Break
                </WatchFaceButton>
                <WatchFaceButton
                    selected={activeTimer === L_BREAK}
                    seconds={L_BREAK}
                >
                    Long Break
                </WatchFaceButton>
            </div>
            <div className="font-fredoka m-2 flex justify-start p-6 text-7xl text-shadow-lg/20">
                <p>{`${padTime(minutes)}:${padTime(seconds)}`}</p>
            </div>
            <div>
                <button
                    className="mb-4 cursor-pointer rounded-md bg-white px-4 py-2 text-2xl text-rose-900 shadow-xl/20 hover:shadow-xl/40"
                    onClick={handleOnClick}
                >
                    {label}
                </button>
            </div>
        </div>
    )
}

function WatchFaceButton(props) {
    const { children, seconds, selected } = props
    const setTime = useTimerStore((state) => state.setTime)
    const setIsStarted = useTimerStore((state) => state.setIsStarted)
    const setActiveTimer = useTimerStore((state) => state.setActiveTimer)

    const handleOnClick = (seconds) => {
        setTime(seconds)
        setIsStarted(false)
        setActiveTimer(seconds)
    }

    return (
        <button
            onClick={() => handleOnClick(seconds)}
            className={classNames(
                'w-full cursor-pointer rounded-md bg-transparent p-2 sm:px-3 sm:py-1',
                {
                    'bg-white text-rose-900 inset-shadow-sm/60 hover:inset-shadow-sm/90':
                        selected,
                },
                { 'inset-shadow-sm/30 hover:inset-shadow-sm/60': !selected }
            )}
        >
            {children}
        </button>
    )
}

function padTime(value) {
    return String(value).padStart(2, '0')
}

export default WatchFace
