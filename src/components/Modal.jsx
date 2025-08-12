import classNames from "classnames"
import { useTaskStore } from "../store"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Modal (props) {
  const { children, showDelete, task } = props
  const addTask = useTaskStore(state => state.addTask)
  const editTask = useTaskStore(state => state.editTask)
  const setModal = useTaskStore(state => state.setModal)
  const setCurrentTask = useTaskStore(state => state.setCurrentTask)
  const modal = useTaskStore(state => state.modal)
  const [text, setText] = useState('')

  useEffect(() => {task && setText(task.title)}, [])

  const handleEditTask = (title) => {
    console.log('Edtingin task')
    if (title === '') {
      alert('Title cannot be empty')
      return
    }
    editTask(task.id, title)
    const updatedTask = useTaskStore.getState().tasks.find(t => t.id === task.id)
    setCurrentTask(updatedTask)
    setModal({action: null})
  }

  const handleAddTask = (title) => {
    console.log('Adding a new task')
    if (title === '') return
    const newTask = {
      id: Date.now().toString(),
      title: title,
      status: "BACKLOG",
      pomo_count: 0
    }
    addTask(newTask)
    setModal({action: null})
  }
  
  return (
    <div className="fixed inset-0 flex justify-center bg-black/50 items-center z-2">
      <div className="flex flex-col w-xs bg-red-400/90 justify-center p-4 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <p>{children}</p>
          <FontAwesomeIcon 
            className="cursor-pointer"
            onClick={() => setModal({action: null})} 
            icon="fa-solid fa-xmark"/>
        </div>
        <input 
          className="w-full inset-shadow-sm/30 rounded-md px-2 py-1 mb-2 focus:outline-0" 
          value={text} type="text" name="taskInput"
          placeholder="What are you working on?"
          onChange={e=>setText(e.target.value)}
        />
        <div className="flex flex-row-reverse justify-between items-center">
          <div className="flex justify-end">
            <ModalButton onClick={() => setModal({action: null})}>Cancel</ModalButton>
            <ModalButton primary type="submit" onClick={() => {
              if (modal.action === 'addTask') handleAddTask(text)
              if (modal.action === 'editTask') handleEditTask(text)
            }}>Done</ModalButton>
          </div>
          {showDelete && <FontAwesomeIcon className="cursor-pointer" icon="fa-solid fa-trash"/>}
        </div>
      </div>
    </div>
  )
}

function ModalButton (props) {
  const { children, primary, onClick } = props
  return (
    <button onClick={onClick} className={classNames(
        'my-1 ml-2 py-1 px-2 rounded-md text-rose-900 shadow-xl/20 hover:cursor-pointer',
        {'bg-white': primary},
        {'bg-red-400 text-white': !primary},
      )}>
      {children}
    </button>
  )
}
