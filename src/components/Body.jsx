import TaskBoard from './TaskBoard'
import WatchFace from './WatchFace'

export default function Body() {
    return (
        <div className="flex flex-col items-center sm:w-full">
            <WatchFace />
            <TaskBoard />
        </div>
    )
}
