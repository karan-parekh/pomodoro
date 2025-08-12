import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Modal from "./Modal"
import { useTaskStore } from "../store"
import classNames from "classnames"

export default function TaskBoard () {
  const modal = useTaskStore(state => state.modal)
  const setModal = useTaskStore(state => state.setModal)
  const tasks = useTaskStore(state => state.tasks)
  const currentTask = useTaskStore(state => state.currentTask)

  return (
    <div className='bg-red-400/60 mt-4 shadow-xl/25 rounded-xl flex flex-col w-sm p-4 items-center'>
      {modal.action === 'addTask' && <Modal>Add Task</Modal>}
      {modal.action === 'editTask' && <Modal showDelete task={modal.task}>Edit Task</Modal>}
      <div className="flex items-center text-left px-2">
        {currentTask ? currentTask.title : 'No Current task'}
      </div>
      <div className="flex items-center w-full mt-2 mb-1">
        <div className="flex-grow border-t border-white shadow-xl mx-4"></div>
      </div>

      <div className="flex flex-col items-center w-full ">
        {tasks.length > 0 ? tasks.map(task => (
          <Task task={task} key={task.id}/>
        )): 'No Tasks added'}
      </div>

      <button 
        onClick={() => setModal({action: 'addTask'})} 
        className='px-2 py-1 mt-4 w-full rounded-md bg-transparent inset-shadow-sm/30 hover:inset-shadow-sm/60 cursor-pointer'>
        <div className="flex items-center justify-between">
          <FontAwesomeIcon className="text-sm" icon="fa-solid fa-circle-plus" />
          <p>Add Task</p>
          <div className="w-[17.5px]"></div>
        </div>
      </button>
      
      <div className="rounded-md bg-red-400/40 shadow-xl/25 text-neutral-100/90 w-full flex py-2 px-4 text-sm justify-between mt-4">
        <div>
          Tasks: {tasks.length}
        </div>
        <div>
          Pomos: 2
        </div>
      </div>
    </div>
  )
}

function Task (props) {
  const { task } = props
  const setCurrentTask = useTaskStore(state => state.setCurrentTask)
  const currentTask = useTaskStore(state => state.currentTask)
  const setModal = useTaskStore(state => state.setModal)
  const keepBorder = task === currentTask

  return (
      <button
        onClick={() => setCurrentTask(task)}
        className={classNames(
            'flex p-2 mt-2 w-full justify-between rounded-md bg-white shadow-xl/20 text-red-400 border-x-3 cursor-pointer hover:border-red-900 hover:shadow-xl/30',
            {'border-red-900': keepBorder},
            {'border-transparent': !keepBorder},
        )}>
        <div className="text-sm flex items-center">
          <FontAwesomeIcon className="mr-2 z-1 cursor-pointer" icon="fa-solid fa-circle-check" />
          <p className="text-rose-900 text-wrap text-left">{task.title}</p>
        </div>
        <div className="flex items-center justify-center">
          <FontAwesomeIcon 
            icon="fa-solid fa-pen-to-square"
            onClick={() => setModal({action: 'editTask', task: task})} 
            className="ml-2 z-1 cursor-pointer" 
          />
        </div>
      </button>
  )
}


