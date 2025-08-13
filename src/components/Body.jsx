import TaskBoard from './TaskBoard'
import WatchFace from './WatchFace'

export default function Body() {
    return (
        <div className="flex sm:w-full flex-col items-center">
            <WatchFace />
            <TaskBoard />
        </div>
    )
}
