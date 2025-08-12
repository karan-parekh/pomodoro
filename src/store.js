import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const timerStore = (set) =>({
    // States
    isStarted: false,
    activeTimer: 1500,
    time: 1500,
    // Setter Functions
    setIsStarted: (newState) => set({isStarted: newState}),
    setActiveTimer: (newState) => set({activeTimer: newState}),
    setTime: (newState) => set({time: newState}),
    decrementTime: () => set((store) => ({time: store.time - 1}))
})

const userStore = (set) => ({
    // States
    user: null,
    loginModal: false,
    // Setter Function
    setUser: (state) => set({user: state}),
    updateUser: () => {},
    setLoginModal: (state) => set({loginModal: state}),
})

/* New Task object sample
const newTask = {
    id: Date.now().toString(),
    title: "Sample title",
    status: "BACKLOG",
    pomo_count: 0
}
*/

const taskStore = (set) => ({
    // States
    tasks: [],
    currentTask: null,
    modal: {action: null},
    // Setter Functions
    setModal: (newModal) => set({modal: newModal}),
    setCurrentTask: (task) => set({currentTask: task}),
    addTask: (newTask) => set(
        (store) => ({tasks:[...store.tasks, newTask]})
    ),
    removeTask: (taskId) => set(
        (store) => ({tasks: store.tasks.filter((task) => task.id !== taskId)})
    ),
    editTitle: (taskId, title) => 
        set((store) => ({
            tasks: store.tasks.map((task) => task.id === taskId ? {...task, title: title} : task)
        })),
    editStatus: (taskId, status) => 
        set((store) => ({
            tasks: store.tasks.map((task) => task.id === taskId ? {...task, status: status} : task)
        })),
    clearAllTasks: () => set({tasks: []}),
    computeTimeSpent: (task) => (task.pomo_count * 25 * 60) // seconds
})


export const useTimerStore = create(timerStore)
export const useTaskStore = create(persist(devtools(taskStore), {name: 'taskStore'}))
export const useUserStore = create(persist(devtools(userStore), {name: 'userStore'}))
