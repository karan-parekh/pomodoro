import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TaskModal from './TaskModal'
import { useTaskStore } from '../store'
import classNames from 'classnames'

export default function TaskBoard() {
    const modal = useTaskStore((state) => state.modal)
    const setModal = useTaskStore((state) => state.setModal)
    const tasks = useTaskStore((state) => state.tasks)
    const currentTask = useTaskStore((state) => state.currentTask)

    return (
        <div className="mt-4 flex w-full flex-col items-center rounded-xl bg-red-400/60 p-4 shadow-xl/25 sm:w-md">
            {modal.action === 'addTask' && <TaskModal>Add Task</TaskModal>}
            {modal.action === 'editTask' && (
                <TaskModal showDelete task={modal.task}>
                    Edit Task
                </TaskModal>
            )}
            <div className="flex items-center px-2 text-left">
                {currentTask ? currentTask.title : 'No Current task'}
            </div>
            <div className="mt-2 mb-1 flex w-full items-center">
                <div className="mx-4 flex-grow border-t border-white shadow-xl"></div>
            </div>

            <div className="flex w-full flex-col items-center">
                {tasks.length > 0
                    ? tasks.map((task) => <Task task={task} key={task.id} />)
                    : 'No Tasks added'}
            </div>

            <button
                onClick={() => setModal({ action: 'addTask' })}
                className="mt-4 w-full cursor-pointer rounded-md bg-transparent px-2 py-1 inset-shadow-sm/30 hover:inset-shadow-sm/60"
            >
                <div className="flex items-center justify-between">
                    <FontAwesomeIcon
                        className="text-sm"
                        icon="fa-solid fa-circle-plus"
                    />
                    <p>Add Task</p>
                    <div className="w-[17.5px]"></div>
                </div>
            </button>

            <div className="mt-4 flex w-full justify-between rounded-md bg-red-400/40 px-4 py-2 text-sm text-neutral-100/90 shadow-xl/25">
                <div>Tasks: {tasks.length}</div>
                <div>Pomos: 2</div>
            </div>
        </div>
    )
}

function Task(props) {
    const { task } = props
    const setCurrentTask = useTaskStore((state) => state.setCurrentTask)
    const currentTask = useTaskStore((state) => state.currentTask)
    const setModal = useTaskStore((state) => state.setModal)
    const editStatus = useTaskStore((state) => state.editStatus)
    const keepBorder = task === currentTask

    return (
        <button
            onClick={() => setCurrentTask(task)}
            className={classNames(
                'mt-2 flex w-full cursor-pointer justify-between rounded-md border-x-3 bg-white p-2 text-red-400 shadow-xl/20 hover:border-red-900 hover:shadow-xl/30',
                { 'border-red-900': keepBorder },
                { 'border-transparent': !keepBorder }
            )}
        >
            <div className="flex items-center text-sm">
                <FontAwesomeIcon
                    icon="fa-solid fa-circle-check"
                    className="z-1 mr-2 cursor-pointer text-red-400/40"
                    onClick={() => editStatus(task.id, 'DONE')}
                />
                <p className="text-left text-wrap text-rose-900">
                    {task.title}
                </p>
            </div>
            <div className="flex items-center justify-center">
                <FontAwesomeIcon
                    icon="fa-solid fa-pen-to-square"
                    onClick={() => setModal({ action: 'editTask', task: task })}
                    className="z-1 ml-2 cursor-pointer"
                />
            </div>
        </button>
    )
}
