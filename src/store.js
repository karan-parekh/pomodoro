import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const timerStore = (set) =>({
    isStarted: false,
    setIsStarted: (newState) => set({isStarted: newState}),

    time: 1500,
    setTime: (newState) => set({time: newState}),
    decrementTime: () => set((store) => ({time: store.time - 1}))
})

const taskStore = (set) => ({
    tasks: [{
        id: '123456',
        title: 'Test Task',
        status: 'BACKLOG',
        pomo_count: 0
    }],
    currentTask: null,
    // setCurrentTask: (task) => set({currentTask: task}),
    setCurrentTask: (task) => set({currentTask: task}),
    addTask: (newTask) => set(
        (store) => ({tasks:[...store.tasks, newTask]})
    ),
    removeTask: (taskId) => set(
        (store) => ({tasks: store.tasks.filter((task) => task.id !== taskId)})
    ),
    clearAllTasks: () => set({tasks: []}),
    computeTimeSpent: (task) => (task.pomo_count * 25 * 60) // seconds
})


export const useTimerStore = create(timerStore)
export const useTaskStore = create(persist(devtools(taskStore)))
// export const useTaskStore = create(persist(taskStore), {name: 'taskStore'})
