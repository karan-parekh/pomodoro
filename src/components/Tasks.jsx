import { useState } from "react"
import { useTaskStore } from "../store"
import "../styles/Task.css"
import trash from '../../public/trash.png'

export default function TaskBoard() {
  const [text, setText] = useState('')
  const [modal, setModal] = useState(false)
  const tasks = useTaskStore(state => state.tasks)
  const addTask = useTaskStore(state => state.addTask)

  const handleAddTask = (title) => {
    if (title === '') return
    const newTask = {
      id: Date.now().toString(),
      title: title,
      status: "BACKLOG",
      pomo_count: 0
    }
    addTask(newTask)
  }

  return (
    <div className="task-board">
      <h2>Tasks</h2>
      {tasks.length > 0 ? tasks.map(task => (
        <TaskItem task={task} key={task.id}/>
      )): 'No Tasks added'}
      <div className="add-task" onClick={()=>setModal(true)}>
        Add Task
      </div>
      {modal && <div className="modal">
        <div className="model-content">
          <input type="text" value={text} onChange={e=>setText(e.target.value)}/>
          <button type="submit" onClick={() => {
            handleAddTask(text)
          }}>Add Task</button>
        </div>
      </div>
      }
    </div>
  )
}

function TaskItem ({task}) {
  const setCurrentTask = useTaskStore(state => state.setCurrentTask)
  const removeTask = useTaskStore(state => state.removeTask)

  return (
    <div className="task-item">
      <div onClick={() => setCurrentTask(task)}>
        <i>@</i>
        <span>{task.title}</span>
      </div>
      <img src={trash} onClick={() => {
        setCurrentTask(null)
        removeTask(task.id)
      }}/>
    </div>
  )
}