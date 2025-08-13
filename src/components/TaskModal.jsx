import classNames from 'classnames'
import { useTaskStore } from '../store'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function TaskModal(props) {
    const { children, showDelete, task } = props
    const addTask = useTaskStore((state) => state.addTask)
    const removeTask = useTaskStore((state) => state.removeTask)
    const editTitle = useTaskStore((state) => state.editTitle)
    const setModal = useTaskStore((state) => state.setModal)
    const setCurrentTask = useTaskStore((state) => state.setCurrentTask)
    const modal = useTaskStore((state) => state.modal)
    const [text, setText] = useState('')

    useEffect(() => {
        task && setText(task.title)
    }, [])

    const handleEditTask = (title) => {
        console.log('Edtingin task')
        if (title === '') {
            alert('Title cannot be empty')
            return
        }
        editTitle(task.id, title)
        const updatedTask = useTaskStore
            .getState()
            .tasks.find((t) => t.id === task.id)
        setCurrentTask(updatedTask)
        setModal({ action: null })
    }

    const handleAddTask = (title) => {
        console.log('Adding a new task')
        if (title === '') return
        const newTask = {
            id: Date.now().toString(),
            title: title,
            status: 'BACKLOG',
            pomo_count: 0,
        }
        addTask(newTask)
        setModal({ action: null })
    }

    return (
        <div className="fixed inset-0 z-2 flex items-center justify-center bg-black/50">
            <div className="flex w-xs flex-col justify-center rounded-xl bg-red-400/90 p-4">
                <div className="mb-2 flex items-center justify-between">
                    <p>{children}</p>
                    <FontAwesomeIcon
                        className="cursor-pointer"
                        onClick={() => setModal({ action: null })}
                        icon="fa-solid fa-xmark"
                    />
                </div>
                <input
                    className="mb-2 w-full rounded-md px-2 py-1 inset-shadow-sm/30 focus:outline-0"
                    value={text}
                    type="text"
                    name="taskInput"
                    placeholder="What are you working on?"
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="flex flex-row-reverse items-center justify-between">
                    <div className="flex justify-end">
                        <ModalButton onClick={() => setModal({ action: null })}>
                            Cancel
                        </ModalButton>
                        <ModalButton
                            primary
                            type="submit"
                            onClick={() => {
                                if (modal.action === 'addTask')
                                    handleAddTask(text)
                                if (modal.action === 'editTask')
                                    handleEditTask(text)
                            }}
                        >
                            Done
                        </ModalButton>
                    </div>
                    {showDelete && (
                        <FontAwesomeIcon
                            className="cursor-pointer"
                            icon="fa-solid fa-trash"
                            onClick={() => {
                                setCurrentTask(null)
                                removeTask(task.id)
                                setModal({ action: null })
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export function ModalButton(props) {
    const { children, primary, onClick } = props
    return (
        <button
            onClick={onClick}
            className={classNames(
                'my-1 ml-2 rounded-md px-2 py-1 text-rose-900 shadow-xl/20 hover:cursor-pointer',
                { 'bg-white': primary },
                { 'bg-red-400 text-white': !primary }
            )}
        >
            {children}
        </button>
    )
}
